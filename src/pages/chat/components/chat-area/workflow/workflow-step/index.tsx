import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { WorkflowStep as WorkflowStepType } from '../../constants';
import { ArrowConnector, WorkflowStepIconRoot } from './styles';

interface WorkflowStepProps {
  index: number;
  active: boolean;
  completed: boolean;
  last: boolean;
  step: WorkflowStepType;
}

export const WorkflowStep: React.FC<WorkflowStepProps> = ({ index, active, completed, last, step }) => {
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
      <WorkflowStepIconRoot ownerState={{ active, completed }}>
        {step.icon}
      </WorkflowStepIconRoot>

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
        {step.label}
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
        {step.description}
      </Typography>

      {!last && (
        <ArrowConnector active={active} completed={completed}>
          <ArrowRightAltIcon />
        </ArrowConnector>
      )}
    </Box>
  );
}; 