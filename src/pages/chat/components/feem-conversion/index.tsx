import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';

export const FeemConversion: React.FC = () => {
  const theme = useTheme();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const handleFile1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile1(event.target.files[0]);
    }
  };

  const handleFile2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile2(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle conversion logic here
    console.log('Converting:', { input1, input2, file1, file2 });
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Feem Conversion
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Convert your files using the Feem conversion tool
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Input 1
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Enter text..."
              sx={{ mb: 1 }}
            />
            <Button
              component="label"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                textTransform: 'none',
                borderColor: alpha(theme.palette.primary.main, 0.5),
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              {file1 ? file1.name : 'Choose File'}
              <input
                type="file"
                hidden
                onChange={handleFile1Change}
              />
            </Button>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Input 2
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Enter text..."
              sx={{ mb: 1 }}
            />
            <Button
              component="label"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                textTransform: 'none',
                borderColor: alpha(theme.palette.primary.main, 0.5),
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              {file2 ? file2.name : 'Choose File'}
              <input
                type="file"
                hidden
                onChange={handleFile2Change}
              />
            </Button>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 2,
              background: `linear-gradient(45deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.primary.light})`,
              '&:hover': {
                background: `linear-gradient(45deg, 
                  ${theme.palette.primary.dark}, 
                  ${theme.palette.primary.main})`,
              },
            }}
          >
            Convert
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}; 