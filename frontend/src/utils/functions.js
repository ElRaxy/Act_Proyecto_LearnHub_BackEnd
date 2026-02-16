import axios from 'axios'

const baseUrl = (import.meta.env.VITE_BASE_URL_BACKEND || '')
  .trim()
  .replace(/^['"]|['"]$/g, '')
  .replace(/\/+$/, '')

const buildUrl = endpoint => {
  const normalizedEndpoint = `${endpoint || ''}`.trim()
  if (/^https?:\/\//i.test(normalizedEndpoint)) return normalizedEndpoint
  return `${baseUrl}${normalizedEndpoint}`
}

export const sendRequest = async (
  method,
  urlEndpoint,
  params = null,
  redir = ''
) => {
  const res = {
    success: false,
    succes: false, // Compatibilidad legacy
    status: null,
    data: null,
    message: '',
  }

  try {
    const token = localStorage.getItem('token')
    const normalizedMethod = `${method || 'GET'}`.toUpperCase()

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) headers.Authorization = `Bearer ${token}`

    const config = {
      method: normalizedMethod,
      url: buildUrl(urlEndpoint),
      headers,
      withCredentials: true,
    }

    if (!['GET', 'DELETE'].includes(normalizedMethod) && params !== null) {
      config.data = params
    }

    const response = await axios(config)

    res.success = true
    res.succes = true
    res.status = response.status
    res.data = response.data
    res.message = 'Operacion exitosa'

    if (redir) {
      window.location.href = redir
    }
  } catch (error) {
    res.status = error.response?.status || 500
    res.data = error.response?.data || null
    res.message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Error del servidor'
  }

  return res
}
