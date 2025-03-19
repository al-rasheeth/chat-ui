import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box } from '@mui/material';
import React from 'react';

interface MessageTimeProps {
  isUser: boolean;
  time: string;
}

export const MessageTime: React.FC<MessageTimeProps> = ({ isUser, time }) => {
  return (
    <Box
      className="message-time"
      sx={{
        position: 'absolute',
        bottom: -20,
        right: !isUser ? 'auto' : 0,
        left: !isUser ? 0 : 'auto',
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        color: 'text.secondary',
        fontSize: '0.75rem'
      }}
    >
      <AccessTimeIcon sx={{ fontSize: '0.875rem' }} />
      {time}
    </Box>
  );
}; 