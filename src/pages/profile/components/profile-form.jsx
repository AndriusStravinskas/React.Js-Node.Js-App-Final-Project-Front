import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileUpdateValidationSchema from '../validation/profile-update-validate-schema';

const ProfileForm = () => {
  const nav = useNavigate();

  const { username } = useParams();
  const [user, setUser] = React.useState({
    imageUrl: '',
    username: ''
  });
  const [error, setError] = React.useState('');


  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/get-single-user/${username}`);
      console.log(res.data);
      setUser({
        imageUrl: res.data.user.imageUrl,
        username: res.data.user.username,
      });
    };
    fetchData();
  }, [username]);

  const Formik = useFormik({
    initialValues: user,
    validationSchema: ProfileUpdateValidationSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const res = await axios.post(`http://localhost:5000/profile/${username}`, values);
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('avatarImage', res.data.avatarImage);
          // perkrauti puslapi pagal atnaujintą username
          window.location.replace(`/profile/${res.data.username}`);
        } else {
          setError(res.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  React.useEffect(() => {
    Formik.setValues(user);
  }, [user]);


  return (

    <Box 
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    }}
    >
      {error && <Alert severity="error" sx={{ mb: 5}}>{error}</Alert>}
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Update profile
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ 
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
         }}
        onSubmit={Formik.handleSubmit}
      >
        <TextField
          margin="normal"
          fullWidth
          id="imageUrl"
          label="Image URL"
          name="imageUrl"
          value={Formik.values.imageUrl}
          onChange={Formik.handleChange}
          error={Formik.touched.imageUrl && Boolean(Formik.errors.imageUrl)}
          helperText={Formik.touched.imageUrl && Formik.errors.imageUrl}

        />

        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={Formik.values.username}
          onChange={Formik.handleChange}
          error={Formik.touched.username && Boolean(Formik.errors.username)}
          helperText={Formik.touched.username && Formik.errors.username}

        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width: '200px' }}
        >

          Update

        </Button>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width: '200px', }}
          onClick={() => nav(`/change-password/${username}`)}
        >
          Change password
        </Button>
      </Box>
    </Box>

  );
};

export default ProfileForm;