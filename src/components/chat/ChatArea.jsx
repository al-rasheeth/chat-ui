import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import WorkflowAnimation from '../workflow/WorkflowAnimation';

/**
 * Main chat area component that manages messages and workflow state
 */
const ChatArea = () => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const inputRef = useRef(null);
  const typingMessageRef = useRef(null);

  // Focus the input field when the component mounts
  useEffect(() => {
    focusInput();
  }, []);

  // Handle workflow animation
  useEffect(() => {
    let timer;
    if (showWorkflow && activeStep < 5) {
      // Progress through workflow steps until the last one
      timer = setInterval(() => {
        setActiveStep((prevStep) => {
          if (prevStep >= 5) {
            clearInterval(timer);
            return prevStep;
          }
          return prevStep + 1;
        });
      }, 1000); // Each step takes 1 second
    }
    return () => clearInterval(timer);
  }, [showWorkflow, activeStep]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSend = () => {
    if (!message.trim() || isProcessing) return;
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: message.trim()
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    setIsProcessing(true);
    
    // Show workflow animation
    setShowWorkflow(true);
    setActiveStep(0);

    // Simulate AI response after workflow completes
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: "I'll help you with that! Here's my response to your query:\n\n" +
          "Based on your message, I can provide the following information:\n\n" +
          "```javascript\n" +
          "// Example code that might be relevant\n" +
          "function processUserQuery(query) {\n" +
          "  const result = analyzeQuery(query);\n" +
          "  return generateResponse(result);\n" +
          "}\n" +
          "```\n\n" +
          "Is there anything specific you'd like me to elaborate on?"
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
      setShowWorkflow(false);
      
      // Focus the input field after sending a message
      focusInput();
    }, 6000); // Wait for workflow animation to complete
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: theme.palette.background.default,
      position: 'relative',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: theme.shadows[3]
    }}>
      {/* Workflow animation positioned above the chat */}
      <Box sx={{ 
        position: 'relative', 
        height: showWorkflow ? '120px' : '0px',
        transition: 'height 0.3s ease-in-out',
        overflow: 'hidden'
      }}>
        <WorkflowAnimation 
          show={showWorkflow} 
          activeStep={activeStep} 
        />
      </Box>
      
      {/* Message list */}
      <MessageList 
        messages={messages}
        onSuggestionClick={handleSuggestionClick}
        isTyping={isProcessing}
        typingMessageRef={typingMessageRef}
      />
      
      {/* Chat input */}
      <ChatInput 
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        inputRef={inputRef}
        focusInput={focusInput}
        isProcessing={isProcessing}
      />
    </Box>
  );
};

export default ChatArea; 