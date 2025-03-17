import React from 'react';
import { Box, Typography, Paper, Button, useTheme } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Sample suggestion prompts
const suggestions = [
  "Explain quantum computing in simple terms",
  "Write a short story about a robot learning to paint",
  "Help me plan a 7-day trip to Japan",
  "Create a workout routine for beginners",
  "Suggest healthy meal prep ideas for the week"
];

/**
 * Component displayed when no chat messages exist
 */
const EmptyChatState = ({ onSuggestionClick }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 3,
        textAlign: 'center',
      }}
    >
      <AutoAwesomeIcon 
        sx={{ 
          fontSize: 60, 
          color: theme.palette.primary.main,
          mb: 2,
          opacity: 0.8,
        }} 
      />
      
      <Typography variant="h4" gutterBottom fontWeight="bold">
        How can I help you today?
      </Typography>
      
      <Typography 
        variant="body1" 
        color="textSecondary" 
        sx={{ maxWidth: 600, mb: 4 }}
      >
        Start a conversation or try one of these suggestions
      </Typography>
      
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: 2,
          maxWidth: 800,
        }}
      >
        {suggestions.map((suggestion, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: 3,
                borderColor: theme.palette.primary.light,
              },
            }}
            onClick={() => onSuggestionClick(suggestion)}
          >
            <Typography variant="body2">{suggestion}</Typography>
          </Paper>
        ))}
      </Box>
      
      <Button
        variant="outlined"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => onSuggestionClick("Tell me what you can do")}
      >
        Learn what I can do
      </Button>
    </Box>
  );
};

export default EmptyChatState; 