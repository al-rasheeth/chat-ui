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

  const getActiveChatId = async () => {
    if (!activeChatId) {
      const newChatId = await addChat('New Chat');
      setActiveChat(newChatId);
      return newChatId;
    }
    return activeChatId;
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    let currentChatId = await getActiveChatId();
    
    try {
      const newMessage = {
        text: trimmedInput,
        isUser: true
      };

      await addMessage(currentChatId, newMessage);
      setInput('');
      setLoading(true);
      setWorkflowStep(0);

      // Simulate AI response with workflow steps
      const steps = [0, 1, 2, 3, 4, 5];
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Each step takes 1 second
        setWorkflowStep(steps[i]);
        
        if (i === steps.length - 1) {
          const aiResponse = {
            text: "This is a simulated AI response. In a real application, this would be replaced with actual AI-generated content.",
            isUser: false
          };
          await addMessage(currentChatId, aiResponse);
          setLoading(false);
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setLoading(false);
      // You might want to show an error message to the user here
    }
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

