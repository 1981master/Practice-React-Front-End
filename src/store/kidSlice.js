import { createSlice } from '@reduxjs/toolkit'

const kidSlice = createSlice({
    name: 'kids',
    initialState: { list: [], selectedKid: null },
    reducers: {
        setKids(state, action) {
            state.list = action.payload
        },
        selectKid(state, action) {
            state.selectedKid = action.payload
        },
    },
})

export const { setKids, selectKid } = kidSlice.actions
export default kidSlice.reducer
