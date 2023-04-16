import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';

const UserCard = ({ user }) => {

  const loggedInUser = useSelector((state) => state.user.myUser.user);
  const myUser = useSelector((state) => state.user.myUser);
  const nav = useNavigate();



  const handleCreateChat = async (username) => {


    try {
      const res = await axios.post('http://localhost:5000/create-chat', { 
        username,
        loggedInUserUsername: loggedInUser.username,
        loggedinUserId: loggedInUser.userSecret });
      console.log(res.data);

    } catch (error) {
      console.log(error.message);
    }
  };


  return (

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
      onClick={() => nav(`/userProfile/${user.username}`)}
      >
        <CardMedia
          component="img"
          height="350"
          image={user.imageUrl}
          alt={`${user.username} profile image`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {user.username}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {myUser.loggedIn && (
          <Button
            size="small"
            color="primary"
            onClick={() => handleCreateChat(user.username)}
          >
            Create a chat
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default UserCard;