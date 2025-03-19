import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MemoryIcon from '@mui/icons-material/Memory';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SendIcon from '@mui/icons-material/Send';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import React, { JSX, useEffect, useState } from 'react';
import { ChatMessage } from './ChatMessage';

// Empty state suggestions
const SUGGESTIONS: string[] = [
  "Explain how React hooks work",
  "Write a function to find prime numbers",
  "Help me debug my CSS flexbox layout",
  "Create a simple Node.js server"
];

interface WorkflowStep {
  label: string;
  icon: JSX.Element;
  description: string;
}

// Workflow steps
const WORKFLOW_STEPS: WorkflowStep[] = [
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

interface ArrowConnectorProps {
  active: boolean;
  completed: boolean;
}

// Custom arrow connector
const ArrowConnector = styled('div')<ArrowConnectorProps>(({ theme, active, completed }) => ({
  position: 'absolute',
  top: '50%',
  left: 'calc(100% - 15px)',
  transform: 'translateY(-50%)',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  color: active || completed
    ? theme.palette.primary.main
    : theme.palette.grey[400],
  transition: 'all 0.5s ease',
  '& svg': {
    fontSize: 30,
    animation: active ? `${slideRight} 0.5s ease forwards` : 'none',
    filter: active || completed
      ? `drop-shadow(0 0 3px ${theme.palette.primary.main})`
      : 'none',
  }
}));

interface WorkflowStepIconProps {
  active: boolean;
  completed: boolean;
  className?: string;
  icon: number;
}

interface WorkflowStepIconRootProps {
  ownerState: {
    active: boolean;
    completed: boolean;
  };
}

// Custom step icon
const WorkflowStepIconRoot = styled('div')<WorkflowStepIconRootProps>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[300],
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
    boxShadow: `0 8px 16px rgba(0,0,0,0.2), 0 0 0 4px rgba(66, 165, 245, 0.1)`,
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

const WorkflowStepIcon: React.FC<WorkflowStepIconProps> = ({ active, completed, className, icon }) => {
  return (
    <WorkflowStepIconRoot ownerState={{ active, completed }} className={className}>
      {WORKFLOW_STEPS[icon - 1].icon}
    </WorkflowStepIconRoot>
  );
};

interface WorkflowStepProps {
  index: number;
  active: boolean;
  completed: boolean;
  last: boolean;
  label: string;
  description: string;
}

// Custom step component with arrow
const WorkflowStep: React.FC<WorkflowStepProps> = ({ index, active, completed, last, label, description }) => {
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

  // Focus the input field when the component mounts
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

  const renderWorkflow = () => (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 4,
      px: 2,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {WORKFLOW_STEPS.map((step, index) => (
        <WorkflowStep
          key={step.label}
          index={index}
          active={index === currentStep}
          completed={index < currentStep}
          last={index === WORKFLOW_STEPS.length - 1}
          label={step.label}
          description={step.description}
        />
      ))}
    </Box>
  );

  const renderEmptyState = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        py: 4,
        px: 2,
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          mb: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -20,
            left: -20,
            right: -20,
            bottom: -20,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            opacity: 0.1,
            borderRadius: '50%',
            animation: `${pulse} 3s infinite ease-in-out`
          }
        }}
      >
        <SmartToyOutlinedIcon
          sx={{
            fontSize: 80,
            color: theme.palette.primary.main,
            filter: 'drop-shadow(0 0 10px rgba(66, 165, 245, 0.5))',
            animation: `${float} 3s infinite ease-in-out`
          }}
        />
      </Box>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Welcome to AI Chat
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        Ask me anything! I can help you with programming, debugging, or any other technical questions.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', maxWidth: 800 }}>
        {SUGGESTIONS.map((suggestion, index) => (
          <Button
            key={index}
            variant="outlined"
            startIcon={<AutoAwesomeIcon />}
            onClick={() => handleSuggestionClick(suggestion)}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            {suggestion}
          </Button>
        ))}
      </Box>
    </Box>
  );

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
          renderEmptyState()
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
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          position: 'sticky',
          bottom: 0,
          zIndex: 1
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            size="small"
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
