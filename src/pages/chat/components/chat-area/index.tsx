import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ChatMessage } from './chat-message';
import { Workflow } from './workflow';
import { EmptyState } from './empty-state';
import { ChatInput } from './chat-input';

interface Message {
  text: string;
  isUser: boolean;
}

export const ChatArea: React.FC = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    focusInput();
  }, []);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      text: input,
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentStep(0);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        text: "This is a simulated AI response. In a real application, this would be replaced with actual AI-generated content.",
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 3000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    focusInput();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
        position: 'relative'
      }}
    >
      {/* Messages Container */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: 2,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <ChatInput
        input={input}
        isLoading={isLoading}
        inputRef={inputRef}
        onInputChange={(e) => setInput(e.target.value)}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
      />
    </Box>
  );
};
