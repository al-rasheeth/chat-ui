import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper,
  useTheme,
  CircularProgress,
  Tooltip,
  Typography,
  Button,
  Fade,
  Zoom,
  InputAdornment
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import ChatMessage from './ChatMessage';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MemoryIcon from '@mui/icons-material/Memory';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// Empty state suggestions
const SUGGESTIONS = [
  "Explain how React hooks work",
  "Write a function to find prime numbers",
  "Help me debug my CSS flexbox layout",
  "Create a simple Node.js server"
];

// Workflow steps
const WORKFLOW_STEPS = [
  {
    label: 'Receiving',
    icon: <ReceiptLongIcon />,
    description: 'Processing your request'
  },
  {
    label: 'Analyzing',
    icon: <PsychologyIcon />,
    description: 'Understanding context'
  },
  {
    label: 'Retrieving',
    icon: <MemoryIcon />,
    description: 'Accessing knowledge'
  },
  {
    label: 'Generating',
    icon: <DataObjectIcon />,
    description: 'Creating response'
  },
  {
    label: 'Verifying',
    icon: <FactCheckIcon />,
    description: 'Checking accuracy'
  },
  {
    label: 'Finalizing',
    icon: <LightbulbIcon />,
    description: 'Optimizing answer'
  }
];

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(66, 165, 245, 0.5); }
  50% { box-shadow: 0 0 20px rgba(66, 165, 245, 0.8); }
  100% { box-shadow: 0 0 5px rgba(66, 165, 245, 0.5); }
`;

const slideRight = keyframes`
  0% { transform: translateX(-10px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

// Custom arrow connector
const ArrowConnector = styled('div')(({ theme, active, completed }) => ({
  position: 'absolute',
  top: '50%',
  left: 'calc(100% - 15px)',
  transform: 'translateY(-50%)',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  color: active || completed 
    ? theme.palette.primary.main 
    : theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400],
  transition: 'all 0.5s ease',
  '& svg': {
    fontSize: 30,
    animation: active ? `${slideRight} 0.5s ease forwards` : 'none',
    filter: active || completed 
      ? `drop-shadow(0 0 3px ${theme.palette.primary.main})`
      : 'none',
  }
}));

// Custom step icon
const WorkflowStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  position: 'relative',
  border: '2px solid transparent',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    boxShadow: `0 8px 16px rgba(0,0,0,0.2), 0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(66, 165, 245, 0.2)' : 'rgba(66, 165, 245, 0.1)'}`,
    transform: 'scale(1.2)',
    animation: `${pulse} 2s infinite ease-in-out, ${glow} 2s infinite ease-in-out`,
    '& svg': {
      animation: `${float} 2s infinite ease-in-out`,
      fontSize: '1.5rem',
      filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))'
    }
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    border: `2px solid ${theme.palette.primary.light}`,
  }),
  '&::before': ownerState.active ? {
    content: '""',
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    opacity: 0.3,
    zIndex: -1,
  } : {},
}));

function WorkflowStepIcon(props) {
  const { active, completed, className, icon } = props;
  
  return (
    <WorkflowStepIconRoot ownerState={{ active, completed }} className={className}>
      {WORKFLOW_STEPS[icon - 1].icon}
    </WorkflowStepIconRoot>
  );
}

// Custom step component with arrow
const WorkflowStep = ({ index, active, completed, last, label, description }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      width: { xs: '100%', sm: `${100 / WORKFLOW_STEPS.length}%` },
      px: 1,
    }}>
      <WorkflowStepIcon active={active} completed={completed} icon={index + 1} />
      
      <Typography 
        variant="body2" 
        fontWeight={active ? 700 : 500}
        sx={{ 
          mt: 1, 
          textAlign: 'center',
          transition: 'all 0.3s ease',
          color: active 
            ? theme.palette.primary.main 
            : theme.palette.text.primary,
          opacity: active ? 1 : 0.9,
          transform: active ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {label}
      </Typography>
      
      <Typography 
        variant="caption" 
        sx={{ 
          display: 'block', 
          textAlign: 'center',
          color: theme.palette.text.secondary,
          height: 20,
          opacity: active ? 1 : 0.7,
          transition: 'all 0.3s ease',
          transform: active ? 'translateY(0)' : 'translateY(5px)',
        }}
      >
        {description}
      </Typography>
      
      {!last && (
        <ArrowConnector active={active} completed={completed}>
          <ArrowRightAltIcon />
        </ArrowConnector>
      )}
    </Box>
  );
};

const ChatArea = () => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isChatInitialized, setIsChatInitialized] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const messagesEndRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus the input field when the component mounts
  useEffect(() => {
    focusInput();
  }, []);

  // Handle workflow animation
  useEffect(() => {
    let timer;
    if (showWorkflow && activeStep < WORKFLOW_STEPS.length - 1) {
      // Progress through workflow steps until the last one
      timer = setInterval(() => {
        setActiveStep((prevStep) => {
          if (prevStep >= WORKFLOW_STEPS.length - 1) {
            clearInterval(timer);
            return prevStep;
          }
          return prevStep + 1;
        });
      }, 1000); // Each step takes 1 second (total 5 seconds to reach last stage)
    }
    return () => clearInterval(timer);
  }, [showWorkflow, activeStep]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      isUser: true,
      message: message.trim()
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    setIsLoading(true);
    setIsChatInitialized(true);
    
    // Show workflow animation
    setShowWorkflow(true);
    setActiveStep(0);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        isUser: false,
        message: "I'll help you with that! Let me process your request..."
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Hide workflow animation after response is received
      setShowWorkflow(false);
      
      // Focus the input field after sending a message
      focusInput();
    }, 6000); // Wait for workflow animation to complete (6 seconds)
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Render workflow animation
  const renderWorkflow = () => (
    <Fade in={showWorkflow} timeout={500}>
      <Box sx={{ 
        position: 'absolute', 
        top: '-5rem', 
        left: 0, 
        right: 0, 
        zIndex: 10,
        p: 3,
        mx: 'auto',
        width: '95%',
        maxWidth: 900,
        borderRadius: 4,
        backdropFilter: 'blur(10px)',
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(30, 30, 30, 0.85)' 
          : 'rgba(255, 255, 255, 0.9)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(66, 165, 245, 0.2)'
          : '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(66, 165, 245, 0.1)',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: showWorkflow ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.98)',
        opacity: showWorkflow ? 1 : 0,
        border: `1px solid ${theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(66, 165, 245, 0.2)'}`,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, 
            ${theme.palette.primary.main}, 
            ${theme.palette.primary.light}, 
            ${theme.palette.primary.main})`,
          backgroundSize: '200% 100%',
          animation: 'gradientAnimation 2s linear infinite',
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          py: 1,
        }}>
          {WORKFLOW_STEPS.map((step, index) => (
            <WorkflowStep 
              key={step.label}
              index={index}
              active={activeStep === index}
              completed={activeStep > index}
              last={index === WORKFLOW_STEPS.length - 1}
              label={step.label}
              description={step.description}
            />
          ))}
        </Box>
      </Box>
    </Fade>
  );

  const renderEmptyState = () => (
    <Fade in={!isChatInitialized && messages.length === 0} timeout={800}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 3,
        textAlign: 'center',
        gap: 4,
        position: 'relative'
      }}>
        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Box sx={{ 
            p: 3, 
            borderRadius: '50%', 
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            boxShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(66, 165, 245, 0.15)' : '0 0 30px rgba(25, 118, 210, 0.1)'
          }}>
            <SmartToyOutlinedIcon sx={{ 
              fontSize: 70, 
              color: theme.palette.primary.main,
              filter: 'drop-shadow(0 0 8px rgba(25, 118, 210, 0.3))'
            }} />
          </Box>
        </Zoom>
        
        <Zoom in={true} style={{ transitionDelay: '400ms' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ 
            mb: 1,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #90caf9, #42a5f5)'
              : 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px'
          }}>
            How can I assist you today?
          </Typography>
        </Zoom>
        
        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
            I'm your AI assistant, ready to help with coding, explanations, and more. Start a conversation or try one of the suggestions below.
          </Typography>
        </Zoom>
        
        <Zoom in={true} style={{ transitionDelay: '600ms' }}>
          <Paper
            elevation={4}
            sx={{
              p: 1,
              width: '100%',
              maxWidth: 700,
              mb: 4,
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: theme.shadows[8],
                transform: 'translateY(-2px)'
              }
            }}
          >
            <TextField
              fullWidth
              inputRef={inputRef}
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              variant="outlined"
              size="medium"
              autoFocus
              onClick={focusInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      color="primary" 
                      onClick={handleSend}
                      disabled={!message.trim() || isLoading}
                      sx={{
                        transition: 'all 0.2s ease',
                        '&:not(:disabled):hover': {
                          transform: 'scale(1.1)',
                          bgcolor: theme.palette.primary.main,
                          color: '#fff'
                        }
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} />
                      ) : (
                        <SendIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyboardIcon color="action" sx={{ opacity: 0.6 }} />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                  transition: 'all 0.3s ease',
                  pr: 1
                },
                '& .MuiOutlinedInput-root:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            />
          </Paper>
        </Zoom>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 2,
          width: '100%',
          maxWidth: 700
        }}>
          {SUGGESTIONS.map((suggestion, index) => (
            <Zoom in={true} style={{ transitionDelay: `${700 + index * 100}ms` }} key={index}>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => handleSuggestionClick(suggestion)}
                startIcon={<AutoAwesomeIcon />}
                sx={{ 
                  py: 1.5, 
                  px: 3, 
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[3],
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)'
                  }
                }}
              >
                {suggestion}
              </Button>
            </Zoom>
          ))}
        </Box>
        
        <Box sx={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
          <Fade in={true} style={{ transitionDelay: '1200ms' }}>
            <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
              Press Enter to send • Shift+Enter for new line
            </Typography>
          </Fade>
        </Box>
      </Box>
    </Fade>
  );

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: theme.palette.background.default,
      position: 'relative'
    }}>
      {messages.length === 0 ? (
        renderEmptyState()
      ) : (
        <Fade in={messages.length > 0} timeout={500}>
          <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            {messages.map((msg, index) => (
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
                <Box>
                  <ChatMessage message={msg.message} isUser={msg.isUser} />
                </Box>
              </Zoom>
            ))}
            <div ref={messagesEndRef} />
          </Box>
        </Fade>
      )}
      
      {messages.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            transition: 'all 0.3s ease-in-out',
            position: 'relative'
          }}
        >
          {renderWorkflow()}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-end',
            gap: 1 
          }}>
            <Tooltip title="Attach file">
              <IconButton 
                color="primary" 
                size="small" 
                sx={{ 
                  mb: 1,
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.1)' }
                }}
              >
                <AttachFileIcon />
              </IconButton>
            </Tooltip>
            <TextField
              fullWidth
              inputRef={inputRef}
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Shift + Enter for new line)"
              variant="outlined"
              size="medium"
              onClick={focusInput}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                  transition: 'all 0.3s ease'
                },
                '& .MuiOutlinedInput-root:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            />
            <IconButton 
              color="primary" 
              size="large"
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
              sx={{
                transition: 'all 0.2s ease',
                '&:not(:disabled):hover': {
                  transform: 'scale(1.1)',
                  bgcolor: theme.palette.primary.main,
                  color: '#fff'
                }
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <SendIcon />
              )}
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatArea; 