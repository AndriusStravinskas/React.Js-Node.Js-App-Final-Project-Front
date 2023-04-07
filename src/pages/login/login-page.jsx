import { Box } from '@mui/material'
import React from 'react'
import LoginForm from './components/login-form'

const LoginPage = () => {

  return ( 
    <Box sx={{ width: '400px', mt: 10}}>
      <LoginForm />
    </Box>
  )
}

export default LoginPage