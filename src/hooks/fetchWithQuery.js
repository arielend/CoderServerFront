import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

const useAxios = ({
    url,
    method,
    body,
    headers,
    inmediate = true,
    queries = []
}) => {
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const fullURL = useMemo(() => {
        const queryString = queries.map( query => {
            `${encodeURIComponent(query.key)}=${encodeURIComponent(query.value)}`
        }).join('&')

        return queryString ? `${url}?${queryString}` : url
    },[url, queries])

    const fetchData = async () => {
        setLoading(true)
        setError(null)

        const config = {
            url: fullURL,
            method,
            headers,
            data: body
        }

        try {
            const response = await axios(config)
            setData(response.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(inmediate) {
            fetchData()
        }
    },[fullURL, method])

    return { data, loading, error, refetch: fetchData}
}

export default useAxios