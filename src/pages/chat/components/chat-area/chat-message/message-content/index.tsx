import { Box, Paper, useTheme } from '@mui/material';
import React from 'react';
import { MarkdownRenderer } from '../../../../../../components/markdown-renderer';
import { MessageTime } from '../message-time';
import { CopyButton } from '../copy-button';

interface MessageContentProps {
  message: string;
  isUser: boolean;
  time: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({
  message,
  isUser,
  time
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', maxWidth: '85%' }}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          bgcolor: isUser
            ? `${theme.palette.primary.main}15`
            : `${theme.palette.background.paper}`,
          borderRadius: 2,
          position: 'relative',
        }}
      >
        <MarkdownRenderer content={message} />
        <MessageTime isUser={isUser} time={time} />
        <CopyButton content={message} />
      </Paper>
    </Box>
  );
}; 