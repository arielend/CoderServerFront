import { useState, useEffect, useCallback, useMemo } from 'react'
import axios from 'axios'

const useAxios = ({
    url,
    method,
    body,
    headers,
    immediate = true,
    queries = [],
    filter = {}
}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fullURL = useMemo(() => {

        const queryParams = [
            ...queries,
            { key: 'filter', value: JSON.stringify(filter) }
        ]
        
        const queryString = queryParams
            .filter(query => query.value != null)
            .map(query =>
                `${encodeURIComponent(query.key)}=${encodeURIComponent(query.value)}`
            ).join('&')
        return queryString ? `${url}?${queryString}` : url
    }, [url, JSON.stringify(queries), JSON.stringify(filter)])

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)

        const source = axios.CancelToken.source()

        const config = {
            url: fullURL,
            method,
            headers,
            data: body,
            cancelToken: source.token
        }

        try {
            const response = await axios(config)
            setData(response.data)
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Request canceled:', err.message)
            } else {
                setError(err.response?.data?.message || err.message)
            }
        } finally {
            setLoading(false)
        }

        return () => {
            source.cancel('Operation canceled by the user.')
        }
    }, [fullURL, method, JSON.stringify(headers), JSON.stringify(body)])

    useEffect(() => {
        let cleanup
        if (immediate) {
            cleanup = fetchData()
        }
        return () => {
            if (cleanup) cleanup()
        }
    }, [fetchData, immediate])

    return { data, loading, error, refetch: fetchData }
}

export default useAxios