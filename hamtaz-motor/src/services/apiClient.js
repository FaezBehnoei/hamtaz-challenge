import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    config.headers['X-User-Name'] = authStore.user.username
  }
  return config
})
export default apiClient