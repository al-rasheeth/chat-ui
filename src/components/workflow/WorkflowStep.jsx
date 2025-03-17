import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import WorkflowStepIcon from './WorkflowStepIcon';
import { ArrowConnector } from './WorkflowStyles';

/**
 * Individual step in the workflow animation
 */
const WorkflowStep = ({ index, active, completed, last, label, description }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      width: { xs: '100%', sm: `${100 / 6}%` },
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

export default WorkflowStep; 