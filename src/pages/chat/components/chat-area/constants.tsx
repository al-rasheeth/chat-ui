import { JSX } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MemoryIcon from '@mui/icons-material/Memory';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export interface WorkflowStep {
  label: string;
  icon: JSX.Element;
  description: string;
}

export const SUGGESTIONS: string[] = [
  "Explain how React hooks work",
  "Write a function to find prime numbers",
  "Help me debug my CSS flexbox layout",
  "Create a simple Node.js server"
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
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