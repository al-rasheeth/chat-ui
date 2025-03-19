import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from '@mui/material';

interface InfoTooltipProps {
  title: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ title }) => (
  <Tooltip title={title}>
    <IconButton size="small" sx={{ ml: 0.5, opacity: 0.7 }}>
      <HelpOutlineIcon fontSize="small" />
    </IconButton>
  </Tooltip>
); 