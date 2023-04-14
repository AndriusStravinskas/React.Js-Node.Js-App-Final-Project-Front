import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConversationCard from './components/card';

const ConversationPage = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.myUser.user);
  const userChat = useSelector((state) => state.user.userChat);

  React.useEffect(() => {
    const fetchChats = async () => {
      const res = await axios.post('http://localhost:5000/allChats', {
        loggedInUserUsername: loggedInUser.username,
        loggedinUserId: loggedInUser.userSecret
      });
      dispatch({ type: 'user/allUserChat', payload: res.data.allChats });

    };
    fetchChats();
  }, [loggedInUser]);

  return (

    <Box sx={{ width: '1000px', mt: 10 }}>
      <Grid container spacing={2} width="100%">

        {userChat?.map((chat) => (
          <Grid item key={chat._id} xs={12} md={6} lg={4}>
            <ConversationCard chat={chat} />
          </Grid>
        ))
        }

      </Grid>
    </Box>

  );
};

export default ConversationPage;