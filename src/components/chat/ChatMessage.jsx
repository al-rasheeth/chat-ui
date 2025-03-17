import React, { forwardRef } from 'react';
import { Box, Typography, Avatar, Paper, useTheme } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ReactMarkdown from 'react-markdown';

/**
 * Component for rendering individual chat messages with markdown and code highlighting
 */
const ChatMessage = forwardRef(({ message, isLast }, ref) => {
  const theme = useTheme();
  const isUser = message.role === 'user';
  
  // Function to parse and render code blocks
  const renderContent = () => {
    if (message.isTyping) {
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </Box>
      );
    }
    
    // Regular expression to find code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    // Find all code blocks and split content
    while ((match = codeBlockRegex.exec(message.content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: message.content.substring(lastIndex, match.index)
        });
      }
      
      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'javascript',
        content: match[2]
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text after last code block
    if (lastIndex < message.content.length) {
      parts.push({
        type: 'text',
        content: message.content.substring(lastIndex)
      });
    }
    
    // If no code blocks were found, treat entire content as text
    if (parts.length === 0) {
      parts.push({
        type: 'text',
        content: message.content
      });
    }
    
    // Render each part
    return parts.map((part, index) => {
      if (part.type === 'code') {
        return (
          <Box key={index} sx={{ my: 2, position: 'relative' }}>
            <Paper 
              elevation={3}
              sx={{ 
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box 
                sx={{ 
                  bgcolor: 'rgba(0,0,0,0.7)', 
                  color: '#fff', 
                  py: 0.5, 
                  px: 2,
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {part.language}
              </Box>
              <SyntaxHighlighter
                language={part.language}
                style={atomDark}
                customStyle={{ margin: 0 }}
              >
                {part.content}
              </SyntaxHighlighter>
            </Paper>
          </Box>
        );
      } else {
        return (
          <Box key={index} sx={{ my: 1 }}>
            <ReactMarkdown>{part.content}</ReactMarkdown>
          </Box>
        );
      }
    });
  };
  
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        mb: 2,
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        sx={{
          bgcolor: isUser ? theme.palette.primary.main : theme.palette.secondary.main,
          width: 40,
          height: 40,
          mr: isUser ? 0 : 2,
          ml: isUser ? 2 : 0,
        }}
      >
        {isUser ? <PersonIcon /> : <SmartToyIcon />}
      </Avatar>
      
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '80%',
          borderRadius: 2,
          backgroundColor: isUser 
            ? theme.palette.primary.light 
            : theme.palette.background.paper,
          color: isUser 
            ? theme.palette.primary.contrastText 
            : theme.palette.text.primary,
          '& p': {
            m: 0,
          },
          '& pre': {
            m: 0,
            p: 1,
            borderRadius: 1,
            backgroundColor: 'rgba(0,0,0,0.1)',
            overflowX: 'auto',
          },
          '& code': {
            fontFamily: 'monospace',
            backgroundColor: isUser 
              ? 'rgba(255,255,255,0.2)' 
              : 'rgba(0,0,0,0.05)',
            p: 0.5,
            borderRadius: 0.5,
          },
          '& .typing-dot': {
            width: 8,
            height: 8,
            backgroundColor: theme.palette.text.secondary,
            borderRadius: '50%',
            display: 'inline-block',
            margin: '0 2px',
            animation: 'typing-animation 1.4s infinite ease-in-out both',
            '&:nth-of-type(1)': {
              animationDelay: '0s',
            },
            '&:nth-of-type(2)': {
              animationDelay: '0.2s',
            },
            '&:nth-of-type(3)': {
              animationDelay: '0.4s',
            },
          },
          '@keyframes typing-animation': {
            '0%, 80%, 100%': {
              transform: 'scale(0.6)',
              opacity: 0.6,
            },
            '40%': {
              transform: 'scale(1)',
              opacity: 1,
            },
          },
        }}
      >
        {renderContent()}
      </Paper>
    </Box>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage; 