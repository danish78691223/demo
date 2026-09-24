// When NEXT_PUBLIC_API_URL is not specified, default to internal Next.js API routes at "/api"
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  // Ensure path starts with a slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // If API_BASE is empty, use Next.js built-in API route prefix /api
  let fullUrl;
  if (!API_BASE) {
    fullUrl = cleanPath.startsWith("/api") ? cleanPath : `/api${cleanPath}`;
  } else {
    fullUrl = `${API_BASE}${cleanPath}`;
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // Ensure session cookies are sent and received
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}

export const authApi = {
  login: (payload) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  signup: (payload) =>
    apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: () => apiRequest("/auth/me"),
  logout: () => apiRequest("/auth/logout", { method: "POST" }),
};

export const subscriptionApi = {
  get: () => apiRequest("/subscription"),
  choosePlan: (payload) =>
    apiRequest("/subscription", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  cancel: () =>
    apiRequest("/subscription/cancel", {
      method: "POST",
    }),
};

export const userApi = {
  getProfile: () => apiRequest("/users/me"),
  updateProfile: (payload) =>
    apiRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
};
