import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

const useAxios = ({
    url,
    method,
    body,
    headers,
    withCredentials = false,
    immediate = true,
    queries = [],
    filter = {}
}) => {
    const [ response, setResponse ] = useState(null)
    //Uso de response en lugar de data
    // const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const fullURL = useMemo(() => {

        const queryParams = [
            ...queries,
            { key: 'filter', value: JSON.stringify(filter) }
        ]

        const queryString = queryParams.map( query => 
            `${encodeURIComponent(query.key)}=${encodeURIComponent(query.value)}`
    ).join('&')

        return queryString ? `${url}?${queryString}` : url
    },[url, queries, filter])

    const fetchData = async () => {
        setLoading(true)
        setError(null)

        const config = {
            url: fullURL,
            method,
            headers,
            data: body,
            withCredentials,
        }

        try {
            const response = await axios(config)
            //Uso de response en lugar de data
            //setData(response.data)
            setResponse(response.data)
        } catch (error) {
            setError(error.response ? error.response.data : error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(immediate) {
            fetchData()
        }
    },[fullURL, method])

    return { response, loading, error, refetch: fetchData}
}

export default useAxios