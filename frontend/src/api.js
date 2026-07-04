import axios from 'axios'

// Empty in dev (Vite proxy handles it), full URL in prod
const baseURL = import.meta.env.VITE_API_BASE || ''

const api = axios.create({
  baseURL: baseURL + '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export const getDonors = (params) => api.get('/donors', { params }).then(r => r.data)
export const createDonor = (data) => api.post('/donors', data).then(r => r.data)
export const getRequests = (params) => api.get('/requests', { params }).then(r => r.data)
export const createRequest = (data) => api.post('/requests', data).then(r => r.data)
export const getStats = () => api.get('/stats').then(r => r.data)

export default api
