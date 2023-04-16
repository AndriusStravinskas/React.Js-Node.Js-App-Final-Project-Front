import { Divider, Grid, List, ListItem, ListItemText, Paper } from '@mui/material';
import React from 'react';
import ChatInput from './components/chat-input';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChatPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const conversation = useSelector((state) => state.user.conversation);
  const myUser = useSelector((state) => state.user.myUser.user);


  React.useEffect(() => {
    const fetchConversation = async () => {
      const res = await axios.get(`http://localhost:5000/getChat/${id}`);
      dispatch({ type: 'user/setConversation', payload: res.data.chat });
      console.log(res.data.chat);
    };
    fetchConversation();
  }, [id, dispatch]);

  const convo = conversation?.messages;

  const convertISODateToTime = (isoDate) => {
    const date = new Date(isoDate);
    const options = { weekday: 'short', hour12: false, hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
  };

  const alignMessage = (sender) => sender === myUser.username ? 'right' : 'left';

  return (

    <Paper sx={{ width: '100%', height: '800px', padding: '20px', marginTop: '20px' }}>
      <Grid container style={{ height: '100vh' }}>
        <Grid item xs={12}>
          <List style={{ height: 'calc(100% - 250px)', overflowY: 'auto' }}>
            {convo?.map((message) => (
              <ListItem key={message.time} >
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText 
                      align={alignMessage(message.sender)} 
                      secondary={convertISODateToTime(message.time)} 
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText 
                      align={alignMessage(message.sender)} 
                      primary={message.message}
                      sx={{
                        display: 'flex',
                        justifyContent: alignMessage(message.sender),
                        '& .MuiListItemText-primary': {
                          backgroundColor: alignMessage(message.sender) === 'right' ? 'primary.main' : 'secondary.main',
                          color: '#fff',
                          padding: '10px',
                          borderRadius: alignMessage(message.sender) === 'right' ? '15px 15px 3px 15px' : '15px 15px 15px 3px',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <ChatInput />
        </Grid>
      </Grid>
    </Paper>

  );
};

export default ChatPage;


/*

import { Divider, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper } from '@mui/material';
import React from 'react';
import ChatInput from './components/chat-input';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChatPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const conversation = useSelector((state) => state.user.conversation);
  const myUser = useSelector((state) => state.user.myUser.user);

  React.useEffect(() => {
    const fetchConversation = async () => {
      const res = await axios.get(`http://localhost:5000/getChat/${id}`);
      dispatch({ type: 'user/setConversation', payload: res.data.chat });
      console.log(res.data.chat);
    };
    fetchConversation();
  }, [id, dispatch]);

  const messages = conversation?.messages;

  const convertISODateToTime = (isoDate) => {
    const date = new Date(isoDate);
    const options = { hour12: false, hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
  };

  const alignMessage = (sender) => {
    return sender === myUser.username ? 'right' : 'left';
  };

  return (
    <Paper sx={{ width: '100%', height: '800px', padding: '20px', marginTop: '20px' }}>
      <Grid container style={{ height: '100vh' }}>
        <Grid item xs={12}>
          <List style={{ height: 'calc(100% - 250px)', overflowY: 'scroll' }}>
            {messages?.map((message) => (
              <ListItem key={message.time}>
                <ListItemAvatar>
                  <Avatar alt={message.sender} src={message.sender.avatarUrl} />
                </ListItemAvatar>
                <ListItemText 
                  align={alignMessage(message.sender)} 
                  primary={message.message} 
                  secondary={convertISODateToTime(message.time)}
                  sx={{
                    borderRadius: '16px',
                    bgcolor: alignMessage(message.sender) === 'right' ? '#DCF8C6' : '#F0F2F5',
                    py: '8px',
                    px: '12px'
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <ChatInput />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChatPage;



*/