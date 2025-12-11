import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} 
      />
      <Route 
        path="/home" 
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/book/:id" 
        element={isAuthenticated ? <BookDetail /> : <Navigate to="/login" replace />} 
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
    </Routes>
  )
}

export default App

