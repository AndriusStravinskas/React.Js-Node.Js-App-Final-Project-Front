import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {

  return (
    <>

      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Sign in
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Link to='/register' variant="body2">Don't have an account? Sign Up</Link>
      </Box>
    </>
  )
}

export default LoginForm