import { Box, Grow } from '@mui/material';
import React from 'react';
import { MessageAvatar } from './message-avatar';
import { MessageContent } from './message-content';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Grow in={true} timeout={500}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          mb: 2,
          flexDirection: isUser ? 'row-reverse' : 'row',
          '&:hover .copy-button': {
            opacity: 1
          },
          '&:hover .message-time': {
            opacity: 1
          }
        }}
      >
        <MessageAvatar isUser={isUser} />
        <MessageContent message={message} isUser={isUser} time={currentTime} />
      </Box>
    </Grow>
  );
};
