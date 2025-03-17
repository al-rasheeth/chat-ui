import React, { useRef } from 'react';
import { Box, TextField, IconButton, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

/**
 * Chat input component with send button and file attachment
 */
const ChatInput = ({ 
  message, 
  setMessage, 
  handleSend, 
  inputRef, 
  focusInput, 
  isProcessing 
}) => {
  const theme = useTheme();
  const fileInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // File handling logic would go here
    console.log('File selected:', e.target.files[0]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '0 0 12px 12px',
        position: 'relative',
      }}
    >
      <IconButton 
        color="primary" 
        onClick={handleFileClick}
        sx={{ mr: 1 }}
      >
        <AttachFileIcon />
      </IconButton>
      
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        onClick={focusInput}
        autoFocus
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: theme.palette.background.default,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />
      
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={!message.trim() || isProcessing}
        sx={{
          ml: 1,
          backgroundColor: message.trim() && !isProcessing ? theme.palette.primary.main : 'transparent',
          color: message.trim() && !isProcessing ? '#fff' : theme.palette.action.disabled,
          '&:hover': {
            backgroundColor: message.trim() && !isProcessing ? theme.palette.primary.dark : 'transparent',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput; 