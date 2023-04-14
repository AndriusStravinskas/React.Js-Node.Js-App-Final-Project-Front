import React from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ConversationCard = ({ chat }) => {
  const nav = useNavigate();

  const loggedInUser = useSelector((state) => state.user.myUser.user);

  const receivers = chat.participantsInfo.filter((user) => user.username !== loggedInUser.username);

  return (
    <div>
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
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ConversationCard;