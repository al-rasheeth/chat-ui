import React from 'react';
import { Box } from '@mui/material';
import ChatArea from '../components/ChatArea';

const ChatPage: React.FC = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <ChatArea />
    </Box>
  );
};

export default ChatPage; 