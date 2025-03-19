import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Avatar, useTheme } from '@mui/material';
import React from 'react';

interface MessageAvatarProps {
  isUser: boolean;
}

export const MessageAvatar: React.FC<MessageAvatarProps> = ({ isUser }) => {
  const theme = useTheme();

  return (
    <Avatar
      sx={{
        bgcolor: isUser
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
        m: 1,
        boxShadow: theme.shadows[2],
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: theme.shadows[4]
        }
      }}
    >
      {isUser ? <PersonIcon /> : <SmartToyIcon />}
    </Avatar>
  );
}; 