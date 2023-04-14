import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import ChangePasswordValidationSchema from '../validation/change-password-validation-schema';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
  const {username} = useParams();
  const [error, setError] = React.useState('');

  const Formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: ChangePasswordValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // pakeisti slaptažodį 

      try {
        const res = await axios.post(`http://localhost:5000/change-password/${username}`, values);
        console.log(res.data);
        if (!res.data.success) {
          setError(res.data.message);
        } else {
          setError('');
          window.history.back();
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });


  return (

    <Box sx={{ width: '400px', mt: 10 }}>
      {error && <Alert severity="error" sx={{ mb: 5}}>{error}</Alert>}
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Update password
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={Formik.handleSubmit}
      >
         
        
        <TextField 
          margin="normal"
          fullWidth
          name="oldPassword"
          label="Old Password"
          type="text"
          id="oldPassword"
          value={Formik.values.oldPassword} 
          onChange={Formik.handleChange}
          error={Formik.touched.oldPassword && Boolean(Formik.errors.oldPassword)}
          helperText={Formik.touched.oldPassword && Formik.errors.oldPassword}
        />

        <TextField
        margin="normal"
        fullWidth
        name="newPassword"
        label="New Password"
        type="text"
        id="newPassword"
        value={Formik.values.newPassword}
        onChange={Formik.handleChange}
        error={Formik.touched.newPassword && Boolean(Formik.errors.newPassword)}
        helperText={Formik.touched.newPassword && Formik.errors.newPassword}

        />

      <TextField
        margin="normal"
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="text"
        id="confirmPassword"
        value={Formik.values.confirmPassword}
        onChange={Formik.handleChange}
        error={Formik.touched.confirmPassword && Boolean(Formik.errors.confirmPassword)}
        helperText={Formik.touched.confirmPassword && Formik.errors.confirmPassword}
        />

        <Button 
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Password
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;