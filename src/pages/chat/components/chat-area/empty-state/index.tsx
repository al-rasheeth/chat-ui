import { Box, Button, Typography, useTheme, Fade, Grow, Zoom } from '@mui/material';
import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import { SUGGESTIONS } from '../constants';
import { buttonPop, float, gradientShift } from './animations';

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSuggestionClick }) => {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
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
        <Grow in timeout={800}>
          <Box
            sx={{
              position: 'relative',
              mb: 4,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -30,
                left: -30,
                right: -30,
                bottom: -30,
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.light} 0%, 
                  ${theme.palette.primary.main} 50%, 
                  ${theme.palette.primary.light} 100%
                )`,
                backgroundSize: '200% 200%',
                opacity: 0.1,
                borderRadius: '50%',
                animation: `${gradientShift} 8s ease infinite`
              }
            }}
          >
            <SmartToyOutlinedIcon
              sx={{
                fontSize: 80,
                color: theme.palette.primary.main,
                filter: 'drop-shadow(0 0 10px rgba(66, 165, 245, 0.5))',
                animation: `${float} 3s ease-in-out infinite`
              }}
            />
          </Box>
        </Grow>

        <Fade in timeout={800} style={{ transitionDelay: '200ms' }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 600
            }}
          >
            Welcome to AI Chat
          </Typography>
        </Fade>

        <Fade in timeout={800} style={{ transitionDelay: '400ms' }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4, 
              maxWidth: 600
            }}
          >
            Ask me anything! I can help you with programming, debugging, or any other technical questions.
          </Typography>
        </Fade>

        <Fade in timeout={800} style={{ transitionDelay: '600ms' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2, 
              justifyContent: 'center', 
              maxWidth: 800
            }}
          >
            {SUGGESTIONS.map((suggestion, index) => (
              <Zoom 
                key={index} 
                in 
                timeout={500} 
                style={{ 
                  transitionDelay: `${800 + index * 100}ms`,
                  transformOrigin: 'center center'
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<AutoAwesomeIcon />}
                  onClick={() => onSuggestionClick(suggestion)}
                  sx={{
                    transition: 'all 0.3s ease',
                    animation: `${buttonPop} 2s ease-in-out 3`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[2]
                    }
                  }}
                >
                  {suggestion}
                </Button>
              </Zoom>
            ))}
          </Box>
        </Fade>
      </Box>
    </Fade>
  );
}; 