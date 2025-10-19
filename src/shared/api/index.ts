import axios from 'axios'

import { API_URL } from '@shared/consts'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 22000,
  withCredentials: true,
})
