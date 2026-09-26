"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";
import { authApi } from "../../lib/api";

const STATUS_OPTIONS = ["new", "contacted", "discussion", "proposal", "won", "lost"];

const SERVICE_LABELS = {
  "web-development": "Web Development",
  software: "Software / Product",
  "ai-ml": "AI / Machine Learning",
  consulting: "Consulting",
  collaboration: "Collaboration",
  other: "Other",
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "products", label: "Products", icon: "▦" },
  { id: "leads", label: "Leads", icon: "◉" },
  { id: "analytics", label: "Analytics", icon: "↗" },
];

export default function AdminPage() {
  const router = useRouter();
  const [section, setSection] = useState("overview");
  const [data, setData] = useState({ leads: [], summary: {} });
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilter, setLeadFilter] = useState("all");
  const [productForm, setProductForm] = useState({
    name: "", category: "product", description: "", href: "", status: "LIVE",
    tags: "", showOnHome: true, showOnProducts: true, sortOrder: 0,
  });

  async function loadLeads() {
    const response = await fetch("/api/admin/leads", { cache: "no-store", credentials: "include" });
    const result = await response.json();
    if (response.status === 401) { router.push("/login?redirect=/admin"); return false; }
    if (response.status === 403) { router.push("/dashboard"); return false; }
    if (!response.ok) throw new Error(result.message || "Unable to load leads.");
    setData(result);
    setSelectedLead((current) => current ? (result.leads.find((lead) => lead._id === current._id) || null) : null);
    return true;
  }

  async function loadAdminData() {
    await fetch("/api/admin/products/seed", { method: "POST", credentials: "include" });
    const [productsResponse, analyticsResponse] = await Promise.all([
      fetch("/api/admin/products", { cache: "no-store", credentials: "include" }),
      fetch("/api/admin/analytics", { cache: "no-store", credentials: "include" }),
    ]);
    if (productsResponse.status === 401 || analyticsResponse.status === 401) { router.push("/login?redirect=/admin"); return false; }
    if (productsResponse.status === 403 || analyticsResponse.status === 403) { router.push("/dashboard"); return false; }
    const productData = await productsResponse.json();
    const analyticsData = await analyticsResponse.json();
    if (productsResponse.ok) setProducts(productData.products || []);
    if (analyticsResponse.ok) setAnalytics(analyticsData);
    return true;
  }

  async function refreshAll() {
    setError("");
    try {
      const auth = await authApi.me();
      if (!auth?.user) { router.push("/login?redirect=/admin"); return; }
      if (auth.user.role !== "admin") { router.push("/dashboard"); return; }
      await Promise.all([loadLeads(), loadAdminData()]);
    } catch (err) {
      setError(err.message || "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refreshAll(); }, []);

  const resetProductForm = () => {
    setProductForm({
      name: "", category: "product", description: "", href: "", status: "LIVE",
      tags: "", showOnHome: true, showOnProducts: true, sortOrder: 0,
    });
    setEditingProduct(null);
  };

  const productPayload = () => ({
    ...productForm,
    tags: productForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
  });

  async function saveProduct(event) {
    event.preventDefault();
    setError("");
    const url = editingProduct ? "/api/admin/products/" + editingProduct : "/api/admin/products";
    const response = await fetch(url, {
      method: editingProduct ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(productPayload()),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.message || "Unable to save product."); return; }
    if (editingProduct) setProducts((items) => items.map((item) => item._id === editingProduct ? result.product : item));
    else setProducts((items) => [...items, result.product]);
    resetProductForm();
  }

  function startEdit(product) {
    setEditingProduct(product._id);
    setProductForm({
      name: product.name || "", category: product.category || "product",
      description: product.description || "", href: product.href || "",
      status: product.status || "LIVE",
      tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
      showOnHome: product.showOnHome !== false, showOnProducts: product.showOnProducts !== false,
      sortOrder: product.sortOrder || 0,
    });
  }

  async function moveProduct(product, direction) {
    const siblings = products.filter((item) => item.category === product.category).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    const index = siblings.findIndex((item) => item._id === product._id);
    const target = siblings[index + direction];
    if (!target) return;
    const responses = await Promise.all([
      fetch("/api/admin/products/" + product._id, { method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ sortOrder: target.sortOrder || 0 }) }),
      fetch("/api/admin/products/" + target._id, { method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ sortOrder: product.sortOrder || 0 }) }),
    ]);
    if (responses.some((item) => !item.ok)) { setError("Unable to reorder products."); return; }
    await loadAdminData();
  }

  async function toggleProduct(id, field, value) {
    const response = await fetch("/api/admin/products/" + id, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include",
      body: JSON.stringify({ [field]: value }),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.message || "Unable to update product."); return; }
    setProducts((items) => items.map((item) => item._id === id ? result.product : item));
  }

  async function deleteProduct(id) {
    if (!window.confirm("Delete this product?")) return;
    const response = await fetch("/api/admin/products/" + id, { method: "DELETE", credentials: "include" });
    if (!response.ok) { const result = await response.json(); setError(result.message || "Unable to delete product."); return; }
    setProducts((items) => items.filter((item) => item._id !== id));
  }

  async function updateStatus(id, status) {
    const response = await fetch("/api/admin/leads/" + id, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include",
      body: JSON.stringify({ status }),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.message || "Unable to update lead."); return; }
    setData((current) => ({ ...current, leads: current.leads.map((lead) => lead._id === id ? result.lead : lead) }));
    setSelectedLead((current) => current?._id === id ? result.lead : current);
    await loadLeads();
  }

  const filteredLeads = useMemo(() => {
    const query = leadSearch.trim().toLowerCase();
    return data.leads.filter((lead) => {
      const matchesStatus = leadFilter === "all" || lead.status === leadFilter;
      const matchesQuery = !query || [lead.name, lead.email, lead.message, lead.service]
        .some((value) => String(value || "").toLowerCase().includes(query));
      return matchesStatus && matchesQuery;
    });
  }, [data.leads, leadSearch, leadFilter]);

  if (loading) {
    return <main className="account-page"><AccountNav dark /><div className="account-container admin-loading">Loading Control Center…</div></main>;
  }

  const activeProducts = products.filter((item) => String(item.status).toUpperCase() === "LIVE").length;

  return (
    <main className="account-page">
      <AccountNav dark />
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            <span>WEBXWHALE</span>
            <small>CONTROL CENTER</small>
          </div>
          <nav className="admin-sidebar-nav">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}>
                <i>{item.icon}</i><span>{item.label}</span>
                {item.id === "leads" && data.summary.new > 0 && <b>{data.summary.new}</b>}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-foot">
            <a href="/home">View website ↗</a>
            <button onClick={refreshAll}>Refresh data ↻</button>
          </div>
        </aside>

        <div className="admin-main">
          <header className="admin-main-header">
            <div>
              <p className="eyebrow">WEBXWHALE ADMIN</p>
              <h1>{section === "overview" ? <>Control <em>center.</em></> : NAV_ITEMS.find((item) => item.id === section)?.label}</h1>
              <p>{section === "leads" ? "Review enquiries, inspect complete lead details and move prospects through your sales pipeline." : "Manage your WebWhale operations from one workspace."}</p>
            </div>
            <button className="admin-refresh" onClick={refreshAll}>Refresh all ↻</button>
          </header>

          {error && <div className="admin-alert">{error}</div>}

          {section === "overview" && (
            <Overview analytics={analytics} data={data} activeProducts={activeProducts} products={products} onNavigate={setSection} />
          )}

          {section === "products" && (
            <ProductsSection
              products={products} productForm={productForm} setProductForm={setProductForm}
              editingProduct={editingProduct} saveProduct={saveProduct} resetProductForm={resetProductForm}
              startEdit={startEdit} moveProduct={moveProduct} toggleProduct={toggleProduct} deleteProduct={deleteProduct}
            />
          )}

          {section === "leads" && (
            <LeadsSection
              data={data} filteredLeads={filteredLeads} leadSearch={leadSearch} setLeadSearch={setLeadSearch}
              leadFilter={leadFilter} setLeadFilter={setLeadFilter} selectedLead={selectedLead}
              setSelectedLead={setSelectedLead} updateStatus={updateStatus}
            />
          )}

          {section === "analytics" && <AnalyticsSection analytics={analytics} />}
        </div>
      </div>

      {selectedLead && (
        <LeadDetail lead={selectedLead} onClose={() => setSelectedLead(null)} onStatusChange={updateStatus} />
      )}
    </main>
  );
}

function Overview({ analytics, data, activeProducts, products, onNavigate }) {
  return (
    <div className="admin-content">
      <section className="admin-stats">
        <Stat label="Unique visitors" value={analytics?.uniqueVisitors ?? "—"} />
        <Stat label="Visits" value={analytics?.totalVisits ?? "—"} />
        <Stat label="Today's visitors" value={analytics?.todayVisitors ?? "—"} />
        <Stat label="Total leads" value={data.summary.total || 0} />
        <Stat label="New leads" value={data.summary.new || 0} />
        <Stat label="Live products" value={activeProducts} />
      </section>
      <div className="admin-overview-grid">
        <div className="admin-panel">
          <div className="admin-panel-head"><div><strong>Lead pipeline</strong><span>Current enquiry status</span></div><button className="admin-text-button" onClick={() => onNavigate("leads")}>View leads →</button></div>
          <div className="pipeline-grid">{STATUS_OPTIONS.map((status) => <div key={status}><span>{status}</span><strong>{data.summary[status] || 0}</strong></div>)}</div>
        </div>
        <div className="admin-panel">
          <div className="admin-panel-head"><div><strong>Quick actions</strong><span>Common admin tasks</span></div></div>
          <div className="quick-actions">
            <button onClick={() => onNavigate("products")}><b>＋</b><span>Add / manage products</span><small>Control homepage and product visibility</small></button>
            <button onClick={() => onNavigate("leads")}><b>◉</b><span>Review incoming leads</span><small>Open a lead for full details</small></button>
            <button onClick={() => onNavigate("analytics")}><b>↗</b><span>Open analytics</span><small>Visitors, pages and product clicks</small></button>
          </div>
        </div>
      </div>
      <AnalyticsMini analytics={analytics} />
    </div>
  );
}

function ProductsSection({ products, productForm, setProductForm, editingProduct, saveProduct, resetProductForm, startEdit, moveProduct, toggleProduct, deleteProduct }) {
  return (
    <div className="admin-content">
      <section className="admin-products admin-products-modern">
        <div className="admin-section-title"><div><p className="eyebrow">CONTENT CONTROL</p><h2>Products & visibility.</h2></div><span>{products.length} items</span></div>
        <form className="admin-product-form" onSubmit={saveProduct}>
          <input placeholder="Product / service name" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
          <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}><option value="learning">Learning platform</option><option value="product">Product</option><option value="service">Service</option></select>
          <input placeholder="External URL (optional)" value={productForm.href} onChange={(e) => setProductForm({ ...productForm, href: e.target.value })} />
          <input placeholder="Status" value={productForm.status} onChange={(e) => setProductForm({ ...productForm, status: e.target.value })} />
          <textarea placeholder="Description" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} required />
          <input placeholder="Tags: SQL, AI, Learning" value={productForm.tags} onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })} />
          <label><input type="checkbox" checked={productForm.showOnHome} onChange={(e) => setProductForm({ ...productForm, showOnHome: e.target.checked })} /> Show on Home</label>
          <label><input type="checkbox" checked={productForm.showOnProducts} onChange={(e) => setProductForm({ ...productForm, showOnProducts: e.target.checked })} /> Show on Products</label>
          <button className="admin-refresh" type="submit">{editingProduct ? "Save changes" : "Add product +"}</button>
          {editingProduct && <button className="admin-cancel" type="button" onClick={resetProductForm}>Cancel</button>}
        </form>
        <div className="admin-product-list">{products.map((product) => (
          <div className="admin-product-row" key={product._id}>
            <div><strong>{product.name}</strong><span>{product.category} · {String(product.status).toUpperCase()}</span><small>{product.description}</small></div>
            <label><input type="checkbox" checked={product.showOnHome} onChange={(e) => toggleProduct(product._id, "showOnHome", e.target.checked)} /> Home</label>
            <label><input type="checkbox" checked={product.showOnProducts} onChange={(e) => toggleProduct(product._id, "showOnProducts", e.target.checked)} /> Products</label>
            <div className="admin-product-actions"><button onClick={() => moveProduct(product, -1)} className="admin-icon-button">↑</button><button onClick={() => moveProduct(product, 1)} className="admin-icon-button">↓</button><button onClick={() => startEdit(product)} className="admin-edit">Edit</button><button onClick={() => deleteProduct(product._id)} className="admin-delete">Delete</button></div>
          </div>
        ))}</div>
      </section>
    </div>
  );
}

function LeadsSection({ data, filteredLeads, leadSearch, setLeadSearch, leadFilter, setLeadFilter, selectedLead, setSelectedLead, updateStatus }) {
  return (
    <div className="admin-content">
      <section className="admin-leads admin-leads-modern">
        <div className="admin-section-title"><div><p className="eyebrow">LEAD MANAGEMENT</p><h2>Incoming enquiries.</h2></div><span>{filteredLeads.length} of {data.leads.length} leads</span></div>
        <div className="lead-toolbar">
          <input value={leadSearch} onChange={(e) => setLeadSearch(e.target.value)} placeholder="Search name, email or message…" />
          <select value={leadFilter} onChange={(e) => setLeadFilter(e.target.value)}><option value="all">All statuses</option>{STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}</select>
        </div>
        <div className="lead-filter-pills">{STATUS_OPTIONS.map((status) => <button key={status} className={leadFilter === status ? "active" : ""} onClick={() => setLeadFilter(status)}>{status}<b>{data.summary[status] || 0}</b></button>)}</div>
        {filteredLeads.length === 0 ? <div className="admin-empty"><strong>No matching leads.</strong><p>Try another search or status filter.</p></div> : (
          <div className="admin-table-wrap"><table className="admin-table lead-table"><thead><tr><th>Lead</th><th>Service</th><th>Message</th><th>Status</th><th>Received</th><th></th></tr></thead><tbody>
            {filteredLeads.map((lead) => <tr key={lead._id} className={selectedLead?._id === lead._id ? "selected" : ""} onClick={() => setSelectedLead(lead)}>
              <td><strong>{lead.name}</strong><a href={"mailto:" + lead.email} onClick={(e) => e.stopPropagation()}>{lead.email}</a></td>
              <td>{SERVICE_LABELS[lead.service] || lead.service}</td><td className="admin-message">{lead.message}</td>
              <td onClick={(e) => e.stopPropagation()}><select value={lead.status} onChange={(e) => updateStatus(lead._id, e.target.value)} className={"lead-status lead-status-" + lead.status}>{STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
              <td>{new Date(lead.createdAt).toLocaleDateString()}</td><td><button className="lead-view-button" onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}>View →</button></td>
            </tr>)}
          </tbody></table></div>
        )}
      </section>
    </div>
  );
}

function LeadDetail({ lead, onClose, onStatusChange }) {
  return (
    <div className="lead-drawer-backdrop" onClick={onClose}>
      <aside className="lead-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="lead-drawer-head"><div><p className="eyebrow">LEAD DETAIL</p><h2>{lead.name}</h2><span>{SERVICE_LABELS[lead.service] || lead.service}</span></div><button onClick={onClose} aria-label="Close lead details">×</button></div>
        <div className="lead-drawer-body">
          <div className="lead-detail-status"><span>Status</span><select value={lead.status} onChange={(e) => onStatusChange(lead._id, e.target.value)} className={"lead-status lead-status-" + lead.status}>{STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}</select></div>
          <div className="lead-detail-actions"><a href={"mailto:" + lead.email}>Email lead ↗</a></div>
          <div className="lead-detail-block"><span>Email</span><a href={"mailto:" + lead.email}>{lead.email}</a></div>
          <div className="lead-detail-block"><span>Service requested</span><strong>{SERVICE_LABELS[lead.service] || lead.service}</strong></div>
          <div className="lead-detail-block"><span>Received</span><strong>{new Date(lead.createdAt).toLocaleString()}</strong></div>
          <div className="lead-detail-block lead-detail-message"><span>Message</span><p>{lead.message}</p></div>
        </div>
      </aside>
    </div>
  );
}

function AnalyticsSection({ analytics }) {
  return <div className="admin-content"><AnalyticsMini analytics={analytics} full /></div>;
}

function AnalyticsMini({ analytics, full = false }) {
  return (
    <section className={"admin-analytics " + (full ? "admin-analytics-full" : "")}>
      <div className="admin-section-title"><div><p className="eyebrow">TRAFFIC INTELLIGENCE</p><h2>Visitors & activity.</h2></div><span>Last 14 days</span></div>
      <div className="admin-analytics-grid">
        <div className="admin-panel admin-traffic-panel"><div className="admin-panel-head"><div><strong>Visitor trend</strong><span>Visits per day</span></div><b>{analytics?.totalClicks ?? 0} clicks</b></div><div className="admin-bars">
          {(analytics?.dailyTrend || []).map((item) => { const max = Math.max(...(analytics?.dailyTrend || []).map((entry) => entry.visits), 1); return <div className="admin-bar-item" key={item.date} title={item.date + " · " + item.visits + " visits"}><div className="admin-bar-track"><i style={{ height: Math.max((item.visits / max) * 100, item.visits ? 8 : 2) + "%" }} /></div><span>{new Date(item.date + "T00:00:00").toLocaleDateString(undefined, { day: "numeric" })}</span></div>; })}
        </div></div>
        <div className="admin-panel"><div className="admin-panel-head"><div><strong>Page performance</strong><span>Most visited pages</span></div></div><div className="admin-page-list">
          {(analytics?.pages || []).slice(0, 8).map((page) => <div className="admin-page-row" key={page.page}><span>{page.page}</span><b>{page.visits}</b><small>{page.unique} unique</small></div>)}
          {(!analytics?.pages || analytics.pages.length === 0) && <p className="admin-muted">No page visits recorded yet.</p>}
        </div></div>
      </div>
      <div className="admin-panel admin-click-panel"><div className="admin-panel-head"><div><strong>Product clicks</strong><span>Which products visitors are exploring</span></div></div><div className="admin-click-grid">
        {(analytics?.productClicks || []).map((item) => <div className="admin-click-card" key={item.targetId}><span>{item.name || item.targetId}</span><strong>{item.clicks}</strong><small>clicks</small></div>)}
        {(!analytics?.productClicks || analytics.productClicks.length === 0) && <p className="admin-muted">Product click data will appear after visitors interact with a product.</p>}
      </div></div>
    </section>
  );
}

function Stat({ label, value }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}
