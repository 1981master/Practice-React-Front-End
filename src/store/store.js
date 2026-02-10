import { configureStore } from '@reduxjs/toolkit'
import subjectReducer from '../store/subjectSlice'
import topicReducer from '../store/topicSlice'
import authReducer from './authSlice'
import kidReducer from './kidSlice'
import todoReducer from './todoSlice'
import uiReducer from './uiSlice'

const sanitizeState = (state) => {
    if (!state) return state

    return {
        ...state,
        auth: state.auth
            ? {
                  ...state.auth,
                  token: '***REMOVED***',
              }
            : state.auth,
    }
}

const sanitizePayload = (payload) => {
    if (!payload) return payload

    const { token, ...rest } = payload
    return rest
}

// Logger middleware
const loggerMiddleware = (storeAPI) => (next) => (action) => {
    if (process.env.NODE_ENV !== 'production') {
        const rawPrevState = storeAPI.getState()
        const prevState = sanitizeState(
            JSON.parse(JSON.stringify(rawPrevState)),
        )

        console.groupCollapsed(`ACTION: ${action.type}`)
        console.log('⏱ Timestamp:', new Date().toISOString())
        console.log('🟡 Before state:', prevState)
        console.log('📦 Payload:', sanitizePayload(action.payload))

        const start = performance.now()
        const result = next(action)
        const end = performance.now()

        const rawNextState = storeAPI.getState()
        const nextState = sanitizeState(
            JSON.parse(JSON.stringify(rawNextState)),
        )

        console.log('🟢 After state:', nextState)

        // Diff: before → after
        const diff = {}
        for (const key in nextState) {
            if (
                JSON.stringify(prevState[key]) !==
                JSON.stringify(nextState[key])
            ) {
                diff[key] = {
                    before: prevState[key],
                    after: nextState[key],
                }
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
        subjects: subjectReducer,
        topics: topicReducer,
    },
    middleware: (getDefaultMiddleware) =>
        process.env.NODE_ENV !== 'production'
            ? getDefaultMiddleware().concat(loggerMiddleware)
            : getDefaultMiddleware(),
})
