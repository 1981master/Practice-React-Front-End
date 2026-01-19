import { createContext, useEffect, useState } from 'react'
import getAllCounters from '../service/api'

//first create the context
export const CounterContext = createContext()

//second create the provider
export default function CounterProvider({ children }) {
    const [count, setCount] = useState(0)
    //for fetch data, and then save it in context
    const [counter, setCounter] = useState([])

    useEffect(() => {
        getAllCounters()
            .then((data) => setCounter(data))
            .catch((error) => console.log('Fatal Fetching All Counters', error))
    }, [])

    //value to share with children
    const value = {
        count,
        setCount,
        counter,
        setCounter,
    }

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    )
}
