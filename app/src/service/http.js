import axios from "axios"

export function createHttpClient(conf = {}) {
    let { apiUrl = '/api', timeout = 5000, uAgent = 'web' } = conf

    return axios.create({
        baseURL: apiUrl,
        timeout: timeout,
        headers: { 'X-Agent': uAgent },
    })
}

export default createHttpClient({})
