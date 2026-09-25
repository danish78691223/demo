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

  useEffect(() => {
    loadLeads();
    loadAdminData();
  }, []);

  async function createProduct(event) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...productForm, tags: productForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean) }) });
    const result = await response.json();
    if (!response.ok) { setError(result.message || "Unable to create product."); return; }
    setProducts((items) => [...items, result.product]);
    setProductForm({ name: "", category: "product", description: "", href: "", status: "LIVE", tags: "", showOnHome: true, showOnProducts: true, sortOrder: 0 });
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
            <h1>Lead <em>workspace.</em></h1>
            <p>Track incoming enquiries and move each opportunity through your sales pipeline.</p>
          </div>
          <button className="admin-refresh" onClick={loadLeads}>Refresh ↻</button>
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
        </section>

        <section className="admin-products">
          <div className="admin-section-title">
            <div><p className="eyebrow">CONTENT CONTROL</p><h2>Products & visibility.</h2></div>
            <span>{products.length} items</span>
          </div>
          <form className="admin-product-form" onSubmit={createProduct}>
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
            <button className="admin-refresh" type="submit">Add item +</button>
          </form>
          <div className="admin-product-list">
            {products.map((product) => (
              <div className="admin-product-row" key={product._id}>
                <div><strong>{product.name}</strong><span>{product.category}</span><small>{product.description}</small></div>
                <label><input type="checkbox" checked={product.showOnHome} onChange={(e) => toggleProduct(product._id, "showOnHome", e.target.checked)} /> Home</label>
                <label><input type="checkbox" checked={product.showOnProducts} onChange={(e) => toggleProduct(product._id, "showOnProducts", e.target.checked)} /> Products</label>
                <button onClick={() => deleteProduct(product._id)} className="admin-delete">Delete</button>
              </div>
            ))}
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
