import React from "react"

const AuthContext = React.createContext({
    login: true,
    language: 'es-ES'
})

export default AuthContext