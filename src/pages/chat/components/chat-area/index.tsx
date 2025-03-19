import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useChatStore } from '../../../../store/chatStore';
import { useUIStore } from '../../../../store/uiStore';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { EmptyState } from './empty-state';
import { Workflow } from './workflow';
import { MessageRole } from '../../../../store/types';

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
        role: MessageRole.USER,
        content: trimmedInput,
        timestamp: Date.now()
      };

      await addMessage(currentChatId, newMessage);
      setInput('');
      setLoading(true);
      setWorkflowStep(0);

      // Get the current chat's messages
      const currentChat = chats.find(chat => chat.id === currentChatId);
      if (!currentChat) {
        throw new Error('Chat not found');
      }

      // Call the mock API endpoint with the entire chat history
      const responsePromise = fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: currentChat.messages
        }),
      });

            // Simulate AI response with workflow steps and make API call concurrently
      const [response] = await Promise.all([
        responsePromise,
        ...[0, 1, 2, 3, 4, 5].map(async (step) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          setWorkflowStep(step);
        })
      ]);

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      await addMessage(currentChatId, data.response);


      setLoading(false);
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
              message={message.content}
              isUser={message.role === 'user'}
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

