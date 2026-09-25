"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";

const STATUS_OPTIONS = [
  "new",
  "contacted",
  "discussion",
  "proposal",
  "won",
  "lost",
];

const SERVICE_LABELS = {
  "web-development": "Web Development",
  software: "Software / Product",
  "ai-ml": "AI / Machine Learning",
  consulting: "Consulting",
  collaboration: "Collaboration",
  other: "Other",
};

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState({ leads: [], summary: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: "", category: "product", description: "", href: "", status: "LIVE", tags: "", showOnHome: true, showOnProducts: true, sortOrder: 0 });

  async function loadLeads() {
    setError("");
    try {
      const response = await fetch("/api/admin/leads", { cache: "no-store" });
      const result = await response.json();

      if (response.status === 401) {
        router.push("/login?redirect=/admin");
        return;
      }

      if (response.status === 403) {
        router.push("/dashboard");
        return;
      }

      if (!response.ok) throw new Error(result.message || "Unable to load leads.");

      setData(result);
    } catch (err) {
      setError(err.message || "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  async function loadAdminData() {
    try {
      await fetch("/api/admin/products/seed", { method: "POST" });
      const [productsResponse, analyticsResponse] = await Promise.all([
        fetch("/api/admin/products", { cache: "no-store" }),
        fetch("/api/admin/analytics", { cache: "no-store" }),
      ]);
      if (productsResponse.status === 401 || productsResponse.status === 403) { router.push("/dashboard"); return; }
      const productData = await productsResponse.json();
      const analyticsData = await analyticsResponse.json();
      if (productsResponse.ok) setProducts(productData.products || []);
      if (analyticsResponse.ok) setAnalytics(analyticsData);
    } catch {}
  }

  async function refreshAll() {
    await Promise.all([loadLeads(), loadAdminData()]);
  }

  useEffect(() => {
    refreshAll();
  }, []);

  const resetProductForm = () => {
    setProductForm({ name: "", category: "product", description: "", href: "", status: "LIVE", tags: "", showOnHome: true, showOnProducts: true, sortOrder: 0 });
    setEditingProduct(null);
  };

  async function createProduct(event) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...productForm, tags: productForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean) }),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.message || "Unable to create product."); return; }
    setProducts((items) => [...items, result.product]);
    resetProductForm();
  }

  function startEdit(product) {
    setEditingProduct(product._id);
    setProductForm({
      name: product.name || "",
      category: product.category || "product",
      description: product.description || "",
      href: product.href || "",
      status: product.status || "LIVE",
      tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
      showOnHome: product.showOnHome !== false,
      showOnProducts: product.showOnProducts !== false,
      sortOrder: product.sortOrder || 0,
    });
    window.scrollTo({ top: document.querySelector(".admin-products")?.offsetTop - 90 || 0, behavior: "smooth" });
  }

  async function saveProduct(event) {
    event.preventDefault();
    if (!editingProduct) return createProduct(event);
    setError("");
    const response = await fetch("/api/admin/products/" + editingProduct, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...productForm, tags: productForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean) }),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.message || "Unable to update product."); return; }
    setProducts((items) => items.map((item) => item._id === editingProduct ? result.product : item));
    resetProductForm();
  }

  async function moveProduct(product, direction) {
    const siblings = products
      .filter((item) => item.category === product.category)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    const index = siblings.findIndex((item) => item._id === product._id);
    const target = siblings[index + direction];
    if (!target) return;

    const response = await Promise.all([
      fetch("/api/admin/products/" + product._id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: target.sortOrder || 0 }),
      }),
      fetch("/api/admin/products/" + target._id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: product.sortOrder || 0 }),
      }),
    ]);
    if (response.some((item) => !item.ok)) {
      setError("Unable to reorder products.");
      return;
    }
    await loadAdminData();
  }

  async function toggleProduct(id, field, value) {
    const response = await fetch("/api/admin/products/" + id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [field]: value }) });
    const result = await response.json();
    if (!response.ok) { setError(result.message || "Unable to update product."); return; }
    setProducts((items) => items.map((item) => item._id === id ? result.product : item));
  }

  async function deleteProduct(id) {
    if (!window.confirm("Delete this item?")) return;
    const response = await fetch("/api/admin/products/" + id, { method: "DELETE" });
    if (!response.ok) { const result = await response.json(); setError(result.message || "Unable to delete product."); return; }
    setProducts((items) => items.filter((item) => item._id !== id));
  }

  async function updateStatus(id, status) {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.message || "Unable to update lead.");
      return;
    }

    setData((current) => ({
      ...current,
      leads: current.leads.map((lead) =>
        lead._id === id ? result.lead : lead
      ),
      summary: {
        ...current.summary,
      },
    }));

    await loadLeads();
  }

  if (loading) {
    return (
      <main className="account-page">
        <AccountNav dark />
        <div className="account-container admin-loading">Loading admin workspace…</div>
      </main>
    );
  }

  return (
    <main className="account-page">
      <AccountNav dark />
      <div className="account-container admin-page">
        <section className="admin-header">
          <div>
            <p className="eyebrow">WEBWHALE ADMIN</p>
            <h1>Control <em>center.</em></h1>
            <p>Manage WEBWHALE content, homepage visibility, traffic, product activity and incoming enquiries from one workspace.</p>
          </div>
          <button className="admin-refresh" onClick={refreshAll}>Refresh all ↻</button>
        </section>

        {error && <div className="admin-alert">{error}</div>}

        <section className="admin-stats">
          <div><span>UNIQUE VISITORS</span><strong>{analytics?.uniqueVisitors ?? "—"}</strong></div>
          <div><span>VISITS</span><strong>{analytics?.totalVisits ?? "—"}</strong></div>
          <div><span>TODAY VISITORS</span><strong>{analytics?.todayVisitors ?? "—"}</strong></div>
          <div><span>TODAY VISITS</span><strong>{analytics?.todayVisits ?? "—"}</strong></div>
          <div><span>TOTAL</span><strong>{data.summary.total || 0}</strong></div>
          <div><span>NEW</span><strong>{data.summary.new || 0}</strong></div>
          <div><span>DISCUSSION</span><strong>{data.summary.discussion || 0}</strong></div>
          <div><span>WON</span><strong>{data.summary.won || 0}</strong></div>
          <div><span>ACTIVE PRODUCTS</span><strong>{products.filter((item) => String(item.status).toUpperCase() === "LIVE").length}</strong></div>
        </section>

        <section className="admin-products">
          <div className="admin-section-title">
            <div><p className="eyebrow">CONTENT CONTROL</p><h2>Products & visibility.</h2></div>
            <span>{products.length} items</span>
          </div>
          <form className="admin-product-form" onSubmit={saveProduct}>
            <input placeholder="Name" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
            <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
              <option value="learning">Learning platform</option><option value="product">Product</option><option value="service">Service</option>
            </select>
            <input placeholder="External URL (optional)" value={productForm.href} onChange={(e) => setProductForm({ ...productForm, href: e.target.value })} />
            <input placeholder="Status" value={productForm.status} onChange={(e) => setProductForm({ ...productForm, status: e.target.value })} />
            <textarea placeholder="Description" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} required />
            <input placeholder="Tags: SQL, AI, Learning" value={productForm.tags} onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })} />
            <label><input type="checkbox" checked={productForm.showOnHome} onChange={(e) => setProductForm({ ...productForm, showOnHome: e.target.checked })} /> Show on Home</label>
            <label><input type="checkbox" checked={productForm.showOnProducts} onChange={(e) => setProductForm({ ...productForm, showOnProducts: e.target.checked })} /> Show on Products</label>
            <button className="admin-refresh" type="submit">{editingProduct ? "Save changes" : "Add item +"}</button>
            {editingProduct && <button className="admin-cancel" type="button" onClick={resetProductForm}>Cancel</button>}
          </form>
          <div className="admin-product-list">
            {products.map((product) => (
              <div className="admin-product-row" key={product._id}>
                <div><strong>{product.name}</strong><span>{product.category}</span><small>{product.description}</small></div>
                <label><input type="checkbox" checked={product.showOnHome} onChange={(e) => toggleProduct(product._id, "showOnHome", e.target.checked)} /> Home</label>
                <label><input type="checkbox" checked={product.showOnProducts} onChange={(e) => toggleProduct(product._id, "showOnProducts", e.target.checked)} /> Products</label>
                <div className="admin-product-actions">
                  <button onClick={() => moveProduct(product, -1)} className="admin-icon-button" title="Move up" aria-label="Move up">↑</button>
                  <button onClick={() => moveProduct(product, 1)} className="admin-icon-button" title="Move down" aria-label="Move down">↓</button>
                  <button onClick={() => startEdit(product)} className="admin-edit">Edit</button>
                  <button onClick={() => deleteProduct(product._id)} className="admin-delete">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-analytics">
          <div className="admin-section-title">
            <div><p className="eyebrow">TRAFFIC INTELLIGENCE</p><h2>Visitors & activity.</h2></div>
            <span>Last 14 days</span>
          </div>

          <div className="admin-analytics-grid">
            <div className="admin-panel admin-traffic-panel">
              <div className="admin-panel-head">
                <div><strong>Visitor trend</strong><span>Visits per day</span></div>
                <b>{analytics?.totalClicks ?? 0} clicks</b>
              </div>
              <div className="admin-bars">
                {(analytics?.dailyTrend || []).map((item) => {
                  const max = Math.max(...(analytics?.dailyTrend || []).map((entry) => entry.visits), 1);
                  return (
                    <div className="admin-bar-item" key={item.date} title={item.date + " · " + item.visits + " visits"}>
                      <div className="admin-bar-track"><i style={{ height: `${Math.max((item.visits / max) * 100, item.visits ? 8 : 2)}%` }} /></div>
                      <span>{new Date(item.date + "T00:00:00").toLocaleDateString(undefined, { day: "numeric" })}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="admin-panel">
              <div className="admin-panel-head"><div><strong>Page performance</strong><span>Most visited pages</span></div></div>
              <div className="admin-page-list">
                {(analytics?.pages || []).slice(0, 8).map((page) => (
                  <div className="admin-page-row" key={page.page}>
                    <span>{page.page}</span><b>{page.visits}</b><small>{page.unique} unique</small>
                  </div>
                ))}
                {(!analytics?.pages || analytics.pages.length === 0) && <p className="admin-muted">No page visits recorded yet.</p>}
              </div>
            </div>
          </div>

          <div className="admin-panel admin-click-panel">
            <div className="admin-panel-head"><div><strong>Product clicks</strong><span>Which products visitors are exploring</span></div></div>
            <div className="admin-click-grid">
              {(analytics?.productClicks || []).map((item) => (
                <div className="admin-click-card" key={item.targetId}>
                  <span>{item.name || item.targetId}</span><strong>{item.clicks}</strong><small>clicks</small>
                </div>
              ))}
              {(!analytics?.productClicks || analytics.productClicks.length === 0) && <p className="admin-muted">Product click data will appear after visitors interact with a product.</p>}
            </div>
          </div>
        </section>

        <section className="admin-leads">
          <div className="admin-section-title">
            <div>
              <p className="eyebrow">INCOMING ENQUIRIES</p>
              <h2>Your leads.</h2>
            </div>
            <span>{data.leads.length} shown</span>
          </div>

          {data.leads.length === 0 ? (
            <div className="admin-empty">
              <strong>No enquiries yet.</strong>
              <p>New submissions from the Contact page will appear here.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Lead</th>
                    <th>Service</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {data.leads.map((lead) => (
                    <tr key={lead._id}>
                      <td>
                        <strong>{lead.name}</strong>
                        <a href={`mailto:${lead.email}`}>{lead.email}</a>
                      </td>
                      <td>{SERVICE_LABELS[lead.service] || lead.service}</td>
                      <td className="admin-message">{lead.message}</td>
                      <td>
                        <select
                          value={lead.status}
                          onChange={(event) =>
                            updateStatus(lead._id, event.target.value)
                          }
                          className={`lead-status lead-status-${lead.status}`}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
