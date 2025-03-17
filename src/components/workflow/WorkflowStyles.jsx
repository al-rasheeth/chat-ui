import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

/**
 * Styled component for the workflow container
 */
export const WorkflowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(3, 2),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, 
      ${theme.palette.primary.light}, 
      ${theme.palette.primary.main}, 
      ${theme.palette.secondary.main}
    )`,
    zIndex: 1,
  },
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(2, 1),
    gap: theme.spacing(2),
  },
}));

/**
 * Styled component for arrow connectors between workflow steps
 */
export const ArrowConnector = styled(Box)(({ theme, active, completed }) => ({
  position: 'absolute',
  right: '-10%',
  top: '20px',
  transform: 'translateY(-50%)',
  color: completed 
    ? theme.palette.success.main 
    : active 
      ? theme.palette.primary.main 
      : theme.palette.grey[400],
  opacity: active ? 1 : 0.7,
  transition: 'all 0.3s ease',
  zIndex: 1,
  
  '& svg': {
    fontSize: '2rem',
    transition: 'all 0.5s ease',
    transform: active ? 'translateX(5px)' : 'translateX(0)',
  },
  
  '@keyframes glow': {
    '0%': {
      filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0))',
    },
    '50%': {
      filter: `drop-shadow(0 0 5px ${theme.palette.primary.main})`,
    },
    '100%': {
      filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0))',
    },
  },
  
  '@keyframes slideRight': {
    '0%': {
      transform: 'translateX(-10px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  
  animation: active 
    ? 'glow 2s infinite, slideRight 0.5s ease-out' 
    : completed 
      ? 'slideRight 0.5s ease-out' 
      : 'none',
  
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
})); 