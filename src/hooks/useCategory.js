import React, { useEffect, useState } from "react"

export default function useCategory(category) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await import(`../utils/data/${category}.json`)
            setData(data.default)
            setLoading(false)
        }
        
        fetchData()

        return () => {
            setData(null)
            setLoading(true)
        }
    }, [category])

    return { data, loading }
}