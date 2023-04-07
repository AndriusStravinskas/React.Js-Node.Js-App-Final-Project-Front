import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './components/register-form'

const RegisterPage = () => {




  return (
    <Box sx={{ width: '400px', mt: 10}}>
      <RegisterForm />
    </Box>
  )
}

export default RegisterPage