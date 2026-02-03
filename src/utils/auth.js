const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const saveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user ? user : null) : null
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}

export const hasPermission = (user, permission) => {
    if (!user || !Array.isArray(user.permissions)) return false
    return user.permissions.includes(permission)
}
