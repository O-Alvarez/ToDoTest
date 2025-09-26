export const saveToken = (Authorization) => {
    localStorage.setItem('Authorization', Authorization)
}

export const getToken = () => {
    return localStorage.getItem('Authorization')
}

export const isAuthenticated = () => {
    return !!getToken()
}

export const logout = () => {
    localStorage.removeItem('Authorization')
}