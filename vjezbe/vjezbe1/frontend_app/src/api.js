// URL backenda se postavlja kroz VITE_API_URL u trenutku builda (lokalno .env.development, na Renderu environment varijabla)
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `HTTP ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  url: API_URL,
  health: () => request('/api/health'),
  getTasks: () => request('/api/tasks'),
  addTask: (text) => request('/api/tasks', { method: 'POST', body: JSON.stringify({ text }) }),
  updateTask: (id, data) => request(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteTask: (id) => request(`/api/tasks/${id}`, { method: 'DELETE' }),
  clearDone: () => request('/api/tasks', { method: 'DELETE' })
}
