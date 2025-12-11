import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      login()
      navigate('/home')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Inicia sesión</h1>
          <p className="login-subtitle">Accede a tu cuenta para comprar y gestionar tus libros</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="form-group password-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <div className="forgot-password-wrapper">
              <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <button type="submit" className="login-button">
            INICIAR SESIÓN
          </button>
        </form>

        <p className="login-register">
          ¿No tienes cuenta? <a href="#" className="register-link">REGISTRATE</a>
        </p>
      </div>
    </div>
  )
}

export default Login

