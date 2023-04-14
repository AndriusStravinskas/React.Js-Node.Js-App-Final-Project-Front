import { Fab, Grid, TextField } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const ChatInput = () => {
  const {id} = useParams();
  const myUser = useSelector((state) => state.user.myUser.user);
  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {

      const message = {
        senderUsername: myUser.username,
        chatId: id,
        message: values.message,
      };
      
      try {
        const res = await axios
        .post('http://localhost:5000/sendMessage', message);
        if(res.data.success) {
          dispatch({ type: 'user/setConversation', payload: res.data.newMessage });
          console.log(res.data);
        }
        console.log(res.data);
        
      } catch (error) {
        console.log(error.message);
        
      }
      formik.resetForm();
    },
  });


  return (

    <Grid container style={{ padding: '20px' }}>
      <Grid item xs={11}>
        <TextField 
          fullWidth 
          name="message"
          id="outlined-basic-email" 
          label="Your message..."
          value={formik.values.message}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={1} align="right">
        <Fab 
          color="primary" 
          aria-label="add"
          onClick={formik.handleSubmit}
        >
          <SendIcon />
        </Fab>
      </Grid>
    </Grid>

  );
};

export default ChatInput;