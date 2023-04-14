import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterValidationSchema from '../validation/register-validate-Schema';
import { useFormik } from 'formik';
import axios from 'axios';
import { AvatarGenerator } from 'random-avatar-generator';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';

const generator = new AvatarGenerator();

const RegisterForm = () => {
  const nav = useNavigate();
  const [showImage, setShowImage] = React.useState(false);


  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      imageUrl: '',
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: async (values) => {
      if (values.imageUrl === '') values.imageUrl = generator.generateRandomAvatar();
      try {
        const res = await axios.post('http://localhost:5000/register', values);
        console.log(res.data);

        if (res.data.success) {
          nav('/login');
        }

      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const ShowInputImage = () => setShowImage(!showImage);

  const clearInputImage = () =>  setShowImage(!showImage);




  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate sx={{ mt: 3 }}
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="register-username"
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="register-email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              id="register-password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm password"
              type="text"
              id="confirm-password"
              autoComplete="confirm-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>
          <Grid item xs={12}>
            {
            !showImage 
            ? (<IconButton 
              component="label"
              sx={{ mt: 1 }}
              onClick={ShowInputImage}
            >
              <AddAPhotoIcon
                sx={{ fontSize: 30 }}
               />
            </IconButton>) 
            : (<FormControl fullWidth>
              <InputLabel htmlFor="register-imageUrl">Image URL</InputLabel>
              <OutlinedInput 
                id="register-imageUrl"
                name="imageUrl"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear input"
                      onClick={clearInputImage}
                      edge="end"
                      >
                      <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                  }
              />
            </FormControl>)
            }
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Link to="/login" variant="body2">Already have an account? Sign in</Link>
      </Box>
    </>
  );
};

export default RegisterForm;