import React, { useState } from 'react'
import { sendRequest } from "../../utils/functions"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async() => {
        const res = await sendRequest("POST", "/users/login", { email, password })

        if(res.success){
            localStorage.setItem("token", res.data.token)
            const user = res.data.user || res.data
            localStorage.setItem("profile", user.profile)
            localStorage.setItem("userId", user._id)

            alert("¡Bienvenido!")
            navigate("/panel") // Redirigiremos al panel tras el éxito
        } else {
            alert("Error: " + res.message)
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Login</h1>
            <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input type="password" placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={handleLogin}>Entrar</button>
            <div style={{ marginTop: '12px' }}>
                <Link to="/register">¿No tienes cuenta? Regístrate</Link>
            </div>
        </div>
    )
}

export default Login