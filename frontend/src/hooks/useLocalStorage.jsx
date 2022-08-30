import { useState, useEffect } from 'react'

const useLocalStorage = (storageKey, fallbackState) => {
    // modified due to NEXT JS SSR
    const [value, setValue] = useState(
        typeof window !== 'undefined'
            ? JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
            : '',
    )

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value))
    }, [value, storageKey])

    return [value, setValue]
}

export default useLocalStorage
