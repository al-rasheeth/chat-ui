import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import {
  Avatar,
  Box,
  Grow,
  IconButton,
  Paper,
  useTheme
} from '@mui/material';
import React from 'react';
import { MarkdownRenderer } from '../../../../../components/markdown-renderer';
import { MessageTime } from './message-time';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const theme = useTheme();
  const [copied, setCopied] = React.useState<boolean>(false);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <MessageTime isUser={isUser} time={currentTime} />
            <IconButton
              className="copy-button"
              size="small"
              onClick={handleCopy}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                opacity: 0,
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              {copied ? <DoneIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </Grow>
  );
};
