import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ChatMessage } from './chat-message';
import { Workflow } from './workflow';
import { EmptyState } from './empty-state';
import { ChatInput } from './chat-input';
import { useChatStore } from '../../../../store/chatStore';
import { useUIStore } from '../../../../store/uiStore';

export const ChatArea: React.FC = () => {
  const theme = useTheme();
  const { activeChatId, setLoading, setWorkflowStep, isLoading, currentWorkflowStep, setActiveChat } = useUIStore();
  const { chats, addMessage, addChat } = useChatStore();
  const activeChat = chats.find(chat => chat.id === activeChatId);
  const [input, setInput] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  useEffect(() => {
    focusInput();
  }, []);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    let currentChatId = activeChatId;
    
    // Create new chat if none exists
    if (!currentChatId) {
      currentChatId = addChat('New Chat');
      setActiveChat(currentChatId);
    }

    const newMessage = {
      text: trimmedInput,
      isUser: true
    };

    addMessage(currentChatId as string, newMessage);
    setInput('');
    setLoading(true);
    setWorkflowStep(0);

    // Simulate AI response with workflow steps
    const steps = [0, 1, 2, 3, 4, 5];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setWorkflowStep(step);
        if (index === steps.length - 1) {
          const aiResponse = {
            text: "This is a simulated AI response. In a real application, this would be replaced with actual AI-generated content.",
            isUser: false
          };
          addMessage(currentChatId as string, aiResponse);
          setLoading(false);
        }
      }, index * 1000); // Each step takes 1 second
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    focusInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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
        {!activeChat || activeChat.messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          activeChat.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Workflow Progress */}
      {isLoading && <Workflow currentStep={currentWorkflowStep} />}

      {/* Input Area */}
      <ChatInput
        input={input}
        isLoading={isLoading}
        inputRef={inputRef}
        onInputChange={handleInputChange}
        onSend={handleSend}
        onKeyPress={handleKeyDown}
      />
    </Box>
  );
};
