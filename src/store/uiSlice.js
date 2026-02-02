import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: { loading: false, error: null },
    reducers: {
        setLoading: (s, a) => {
            s.loading = a.payload
        },
        setError: (s, a) => {
            s.error = a.payload
        },
    },
})

export const { setLoading, setError } = uiSlice.actions
export default uiSlice.reducer
