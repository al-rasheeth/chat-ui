import { Box } from '@mui/material';
import React from 'react';
import { WORKFLOW_STEPS } from '../constants';
import { WorkflowStep } from './workflow-step';

interface WorkflowProps {
  currentStep: number;
}

export const Workflow: React.FC<WorkflowProps> = ({ currentStep }) => {
  return (
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
          step={step}
        />
      ))}
    </Box>
  );
}; 