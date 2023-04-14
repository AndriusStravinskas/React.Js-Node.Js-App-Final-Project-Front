import { Box } from '@mui/material';
import React from 'react';
import RegisterForm from './components/register-form';

const RegisterPage = () => {

  return (
    <Box sx={{ width: '400px', mt: 10 }}>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;