import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
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
    <IconButton
      className="copy-button"
      size="small"
      onClick={handleCopy}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        opacity: 0,
        color: 'text.secondary',
        '&:hover': {
          color: 'primary.main'
        }
      }}
    >
      {copied ? <DoneIcon /> : <ContentCopyIcon />}
    </IconButton>
  );
}; 