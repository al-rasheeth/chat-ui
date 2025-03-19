import SendIcon from '@mui/icons-material/Send';
import { Box, Fade, IconButton, InputAdornment, Paper, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isLoading,
  inputRef,
  onInputChange,
  onSend,
  onKeyPress,
}) => {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          position: 'sticky',
          bottom: 0,
          zIndex: 1
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            size="small"
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={onSend}
                    disabled={!input.trim() || isLoading}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, display: 'block', textAlign: 'center' }}
        >
          Press Enter to send, Shift + Enter for new line
        </Typography>
      </Paper>
    </Fade>
  );
}; 