export default async function apiRequest(url: string, options?: RequestInit) {
  const r = await fetch(url, options);
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "Request failed. Please try again.");
  return data;
}
