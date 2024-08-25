import Axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 15 * 60 * 1000, // Cache for 15 minutes
})

const axios = Axios.create({
    adapter: cache.adapter,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default axios
