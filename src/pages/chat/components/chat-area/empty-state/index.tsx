import { Box, Button, Typography, useTheme } from '@mui/material';
import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import { SUGGESTIONS } from '../constants';
import { pulse, float } from '../workflow/workflow-step/animations';

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSuggestionClick }) => {
  const theme = useTheme();

  return (
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
            onClick={() => onSuggestionClick(suggestion)}
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
}; 