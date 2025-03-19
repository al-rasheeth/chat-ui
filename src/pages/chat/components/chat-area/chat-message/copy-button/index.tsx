import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface CopyButtonProps {
  content: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ content }) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} placement="top">
      <IconButton
        className="copy-button"
        size="small"
        onClick={handleCopy}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          opacity: 0,
          color: 'text.secondary',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            color: 'primary.main',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            transform: 'scale(1.1)'
          }
        }}
      >
        {copied ? <DoneIcon /> : <ContentCopyIcon />}
      </IconButton>
    </Tooltip>
  );
}; 