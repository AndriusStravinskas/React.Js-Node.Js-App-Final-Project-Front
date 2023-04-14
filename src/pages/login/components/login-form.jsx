import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginValidationSchema from '../validation/login-validate-Schema';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();


  const Formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const res = await axios.post('http://localhost:5000/login', values);
        console.log(res.data);
        if (res.data.success) {
        localStorage.setItem('userSecret', res.data.userSecret);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('avatarImage', res.data.avatarImage);
        dispatch({ 
          type: 'user/login',
          payload: { 
            userSecret: res.data.userSecret, 
            username: res.data.username,
            avatarImage: res.data.avatarImage,
          } 
        });
        nav('/');
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={Formik.handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={Formik.values.username}
          onChange={Formik.handleChange}
          error={Formik.touched.username && Boolean(Formik.errors.username)}
          helperText={Formik.touched.username && Formik.errors.username}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="text"
          id="password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
          error={Formik.touched.password && Boolean(Formik.errors.password)}
          helperText={Formik.touched.password && Formik.errors.password}
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
  );
};

export default LoginForm;