import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setOtherUser } from '../../features/user';
import { Avatar, Container, Grid, Typography } from '@mui/material';


const UserProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.otherUser);

  
  console.log(user);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/get-single-user/${username}`);
      console.log(res.data);
      dispatch(setOtherUser(res.data.user));
    };
    fetchData();
  }, [username]);


  return (

    <Container maxWidth="md">
      <Grid 
      container 
      spacing={10}
      >
        <Grid item >
          <Avatar 
          alt={user?.username} 
          src={user?.imageUrl} 
          sx={{ width: 500, height: 500 }}
          />
        </Grid>
        <Grid 
        item 
        xs={12} 
        md={4}
        alignSelf='center'
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