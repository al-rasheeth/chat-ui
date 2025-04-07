import { Box, Paper, useTheme } from '@mui/material';
import React from 'react';
import { MarkdownRenderer } from '../../../../../../components/markdown-renderer';
import { CopyButton } from '../copy-button';
import { MessageTime } from '../message-time';
import { JiraTicketButton } from '../jira-ticket-button';

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
    <Box sx={{ position: 'relative', maxWidth: '85%', minWidth: '10%' }}>
      <Paper
        elevation={2}
        className="message-content"
        sx={{
          p: 2,
          bgcolor: isUser
            ? `${theme.palette.primary.main}15`
            : `${theme.palette.background.paper}`,
          borderRadius: 2,
          position: 'relative',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-1px)'
          }
        }}
      >
        <MarkdownRenderer content={message} />
        <MessageTime isUser={isUser} time={time} />
        <CopyButton content={message} />
        {!isUser && <JiraTicketButton message={message} />}
      </Paper>
    </Box>
  );
}; 