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

  useEffect(() => {
    loadLeads();
  }, []);

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
          <div><span>TOTAL</span><strong>{data.summary.total || 0}</strong></div>
          <div><span>NEW</span><strong>{data.summary.new || 0}</strong></div>
          <div><span>DISCUSSION</span><strong>{data.summary.discussion || 0}</strong></div>
          <div><span>WON</span><strong>{data.summary.won || 0}</strong></div>
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
