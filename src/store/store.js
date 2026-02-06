// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from './authSlice'
// import kidReducer from './kidSlice'
// import todoReducer from './todoSlice'
// import uiReducer from './uiSlice'

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         kids: kidReducer,
//         ui: uiReducer,
//         todos: todoReducer,
//     },
// })

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import kidReducer from './kidSlice'
import todoReducer from './todoSlice'
import uiReducer from './uiSlice'

// Logger middleware
const loggerMiddleware = (storeAPI) => (next) => (action) => {
    if (process.env.NODE_ENV !== 'production') {
        const prevState = JSON.parse(JSON.stringify(storeAPI.getState())) // snapshot
        console.groupCollapsed(`ACTION: ${action.type}`)
        console.log('⏱ Timestamp:', new Date().toISOString())
        console.log('🟡 Before state:', prevState)
        console.log('📦 Payload:', action.payload)

        const start = performance.now()
        const result = next(action)
        const end = performance.now()

        const nextState = JSON.parse(JSON.stringify(storeAPI.getState())) // snapshot
        console.log('🟢 After state:', nextState)

        // Compute diff with correct order: before → after
        const diff = {}
        for (const key in nextState) {
            if (
                JSON.stringify(prevState[key]) !==
                JSON.stringify(nextState[key])
            ) {
                diff[key] = { before: prevState[key], after: nextState[key] } // ✅ before first
            }
        }
        console.log('🟠 Diff:', diff)
        console.log('⏳ Duration:', (end - start).toFixed(2), 'ms')
        console.groupEnd()

        return result
    }

    return next(action)
}

// -------------------------
// Configure store
// -------------------------
export const store = configureStore({
    reducer: {
        auth: authReducer,
        kids: kidReducer,
        ui: uiReducer,
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        process.env.NODE_ENV !== 'production'
            ? getDefaultMiddleware().concat(loggerMiddleware)
            : getDefaultMiddleware(), // <-- THIS LINE GOES HERE
})
