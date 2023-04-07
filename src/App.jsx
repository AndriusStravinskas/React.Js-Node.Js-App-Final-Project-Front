import { Container, Box, AppBar, Toolbar, IconButton } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResponsiveAppBar from './components/navbar/appbar'
import RegisterPage from './pages/register/register-page'
import HomePage from './pages/home/home-page'
import LoginPage from './pages/login/login-page'

function App() {

  return (
    <BrowserRouter>

    <ResponsiveAppBar />

    <Container fixed sx={{ display: 'flex', justifyContent: 'center'}}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      
    </Routes>
    </Container>

    </BrowserRouter>
  )
}

export default App
