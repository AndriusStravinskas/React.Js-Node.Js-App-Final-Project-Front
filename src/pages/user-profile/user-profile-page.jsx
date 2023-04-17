import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setOtherUser } from '../../features/user';
import { Avatar, Container, Divider, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';


const UserProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.otherUser);

  const theme = useTheme();

  // useMediaQuery to check screen size
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/get-single-user/${username}`);
      console.log(res.data);
      dispatch(setOtherUser(res.data.user));
    };
    fetchData();
  }, [username]);


  return (

    <Container
      maxWidth="md"
      sx={{
        marginTop: 20,
      }}
    >
      <Grid
        container
        spacing={10}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,

        }}
      >
        <Grid item >
          <Avatar
            alt={user?.username}
            src={user?.imageUrl}
            sx={{ width: 300, height: 300 }}
          />
        </Grid>
        {/* conditionally render Divider */}
        {isMediumScreen && (
          <Divider orientation="vertical" flexItem />
        )}

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          
        >
          <Typography variant="h4" gutterBottom>
            {user?.username}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {user?.email}
          </Typography>
        </Grid>
      </Grid>
    </Container>

  );
};

export default UserProfilePage;