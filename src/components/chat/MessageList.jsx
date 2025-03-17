import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import ChatMessage from './ChatMessage';
import EmptyChatState from './EmptyChatState';

/**
 * Component that displays the list of chat messages
 */
const MessageList = ({ 
  messages, 
  onSuggestionClick, 
  isTyping, 
  typingMessageRef 
}) => {
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change or when typing
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '4px',
        },
      }}
    >
      {messages.length === 0 ? (
        <EmptyChatState onSuggestionClick={onSuggestionClick} />
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isLast={index === messages.length - 1}
            />
          ))}
          
          {isTyping && (
            <ChatMessage
              message={{ 
                role: 'assistant', 
                content: '...',
                isTyping: true 
              }}
              isLast={true}
              ref={typingMessageRef}
            />
          )}
          
          <div ref={messagesEndRef} />
        </>
      )}
    </Box>
  );
};

export default MessageList; 