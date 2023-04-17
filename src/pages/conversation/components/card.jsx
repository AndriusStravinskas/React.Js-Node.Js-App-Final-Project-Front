import React from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConversationCard = ({ chat }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();


  const loggedInUser = useSelector((state) => state.user.myUser.user);

  const receivers = chat.participantsInfo.filter((user) => user.username !== loggedInUser.username);

  const handleDeleteChat = async (id) => {
    console.log(id);

    const confirm = window.confirm('Are you sure you want to delete this chat?');

    if (confirm) {

    try {
      const res = await axios.delete(`http://localhost:5000/deleteChat/${id}`, {
        data: {
          loggedInUserUsername: loggedInUser.username,
        },
      });
      dispatch({ type: 'user/allUserChat', payload: res.data.allChats });

      console.log(res.data);
      
    } catch (error) {
      console.log(error.message);
    }
  }
  };

  return (
    <Box 
    sx={{
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      {receivers.map((receiver) => (
        <Card key={receiver._id} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="350"
              image={receiver.imageUrl}
              alt={receiver.username}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {receiver.username}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => nav(`/chat/${chat._id}`)}
            >
              Open chat
            </Button>
            <Button
              size="small"
              color="warning"
              onClick={() => handleDeleteChat(chat._id)}
            >
              Delete chat
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default ConversationCard;