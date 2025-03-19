import { styled } from '@mui/material/styles';
import { slideRight, pulse, glow, float } from './animations';

interface ArrowConnectorProps {
  active: boolean;
  completed: boolean;
}

interface WorkflowStepIconRootProps {
  ownerState: {
    active: boolean;
    completed: boolean;
  };
}

export const ArrowConnector = styled('div')<ArrowConnectorProps>(({ theme, active, completed }) => ({
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

export const WorkflowStepIconRoot = styled('div')<WorkflowStepIconRootProps>(({ theme, ownerState }) => ({
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