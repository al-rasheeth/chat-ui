import { keyframes } from '@mui/material/styles';

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

export const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(66, 165, 245, 0.5); }
  50% { box-shadow: 0 0 20px rgba(66, 165, 245, 0.8); }
  100% { box-shadow: 0 0 5px rgba(66, 165, 245, 0.5); }
`;

export const slideRight = keyframes`
  0% { transform: translateX(-10px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`; 