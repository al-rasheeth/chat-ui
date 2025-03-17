import React from 'react';
import { Box, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

/**
 * Icon component for workflow steps with animations
 */
const WorkflowStepIcon = ({ active, completed, icon }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: completed 
          ? theme.palette.success.main 
          : active 
            ? theme.palette.primary.main 
            : theme.palette.grey[300],
        color: completed || active ? '#fff' : theme.palette.text.primary,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: active ? 'scale(1.1)' : 'scale(1)',
        boxShadow: active 
          ? `0 0 15px ${theme.palette.primary.main}` 
          : completed 
            ? `0 0 10px ${theme.palette.success.main}` 
            : 'none',
        zIndex: 2,
        '&::before': active && {
          content: '""',
          position: 'absolute',
          top: -4,
          left: -4,
          right: -4,
          bottom: -4,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.primary.main}`,
          animation: 'pulse 2s infinite',
        },
        '@keyframes pulse': {
          '0%': {
            transform: 'scale(1)',
            opacity: 0.8,
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: 0.4,
          },
          '100%': {
            transform: 'scale(1)',
            opacity: 0.8,
          },
        },
        '@keyframes float': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
        animation: active ? 'float 3s ease-in-out infinite' : 'none',
      }}
    >
      {completed ? <CheckIcon /> : icon}
    </Box>
  );
};

export default WorkflowStepIcon; 