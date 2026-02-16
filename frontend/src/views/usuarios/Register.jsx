import React, { useState } from 'react'
import { sendRequest } from "../../utils/functions"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [dni, setDni] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [profile, setProfile] = useState("ALUMNO")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    const res = await sendRequest(
      "POST",
      "/users/register",
      { dni, firstName, lastName, email, phone, birthDate, profile, password }
    )

    if (res.success) {
      alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.")
      navigate("/usuarios")
    } else {
      alert("Error: " + res.message)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Registro</h1>
      <input
        type="text"
        placeholder="DNI..."
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Nombre..."
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Apellidos..."
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Teléfono..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <br />
      <select value={profile} onChange={(e) => setProfile(e.target.value)}>
        <option value="ALUMNO">ALUMNO</option>
        <option value="PROFESOR">PROFESOR</option>
        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
      </select>
      <br />
      <input
        type="password"
        placeholder="Contraseña..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Repetir contraseña..."
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  )
}

export default Register
