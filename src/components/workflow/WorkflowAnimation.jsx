import React from 'react';
import { Box, Fade } from '@mui/material';
import WorkflowStep from './WorkflowStep';
import { WorkflowContainer } from './WorkflowStyles';

// Workflow step data
const workflowSteps = [
  { label: 'Analyzing', description: 'Processing input' },
  { label: 'Planning', description: 'Structuring response' },
  { label: 'Drafting', description: 'Creating content' },
  { label: 'Refining', description: 'Improving quality' },
  { label: 'Reviewing', description: 'Checking accuracy' },
  { label: 'Finalizing', description: 'Preparing delivery' }
];

/**
 * Animated workflow component showing the AI processing stages
 */
const WorkflowAnimation = ({ show, activeStep }) => {
  return (
    <Fade in={show} timeout={500}>
      <Box sx={{ 
        width: '100%', 
        mt: 2, 
        mb: 5,
        position: 'relative',
      }}>
        <WorkflowContainer>
          {workflowSteps.map((step, index) => (
            <WorkflowStep
              key={index}
              index={index}
              active={index === activeStep}
              completed={index < activeStep}
              last={index === workflowSteps.length - 1}
              label={step.label}
              description={step.description}
            />
          ))}
        </WorkflowContainer>
      </Box>
    </Fade>
  );
};

export default WorkflowAnimation; 