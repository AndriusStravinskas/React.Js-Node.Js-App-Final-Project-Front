import { Box, Grid } from '@mui/material';
import React from 'react';
import UserCard from './components/user-card';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const HomePage = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const loggedInUser = useSelector((state) => state.user.myUser.user);


  React.useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:5000/get-all-users');
      dispatch({ type: 'user/allUsers', payload: res.data.users });
    };
    fetchUsers();
  }, []);

  const filterUsers = allUsers?.filter((user) => user._id !== loggedInUser.userSecret);

  return (
    <Box sx={{ width: '1000px', mt: 10 }}>
      <Grid container spacing={2} width="100%">
        {filterUsers.map((user) => (
          <Grid item key={user._id} xs={12} md={6} lg={4} justifyContent='center'>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;