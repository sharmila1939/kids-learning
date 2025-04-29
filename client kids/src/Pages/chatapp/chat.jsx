import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const ChatApp = ({ from, to, fromRole, toRole }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:8888/api/messages/history?from=${from}&to=${to}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMsg = {
      from,
      to,
      fromRole,
      toRole,
      message,
    };

    try {
      await axios.post('http://localhost:8888/api/messages/send', newMsg);
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Auto refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      component={Paper}
      elevation={6}
      sx={{ maxWidth: 600, mx: 'auto', my: 4, p: 3, borderRadius: 4, backgroundColor: '#f4f6f8',marginLeft:50 }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Parent-Teacher Chat
      </Typography>

      <List sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={msg.message}
                secondary={`${msg.fromRole} • ${new Date(msg.sentAt).toLocaleTimeString()}`}
                sx={{ textAlign: msg.from === from ? 'right' : 'left' }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Box display="flex" gap={2}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatApp;