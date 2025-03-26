import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
  Alert,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import JSZip from 'jszip';

interface ConversionResponse {
  [key: string]: any;
}

export const FeemConversion: React.FC = () => {
  const theme = useTheme();
  const [rawTopicName, setRawTopicName] = useState('');
  const [transformedTopicName, setTransformedTopicName] = useState('');
  const [rawData, setRawData] = useState<File | null>(null);
  const [transformedData, setTransformedData] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRawDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/json') {
        setError('Please upload a JSON file');
        return;
      }
      setRawData(file);
      setError(null);
    }
  };

  const handleTransformedDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/json') {
        setError('Please upload a JSON file');
        return;
      }
      setTransformedData(file);
      setError(null);
    }
  };

  const createAndDownloadZip = async (response: ConversionResponse) => {
    const zip = new JSZip();
    
    // Create 7 files from the response
    Object.entries(response).forEach(([key, value]) => {
      zip.file(`${key}.json`, JSON.stringify(value, null, 2));
    });

    // Generate and download zip
    const content = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted_files.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if (!rawTopicName || !transformedTopicName || !rawData || !transformedData) {
      setError('Please fill in all fields and upload both files');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const rawDataContent = await rawData.text();
      const transformedDataContent = await transformedData.text();

      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rawTopicName,
          transformedTopicName,
          rawData: JSON.parse(rawDataContent),
          transformedData: JSON.parse(transformedDataContent),
        }),
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const result: ConversionResponse = await response.json();
      await createAndDownloadZip(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion');
    } finally {
      setLoading(false);
    }
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
          Convert your JSON files using the Feem conversion tool
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Raw Topic Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={rawTopicName}
              onChange={(e) => setRawTopicName(e.target.value)}
              placeholder="Enter raw topic name..."
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
              {rawData ? rawData.name : 'Choose Raw Data JSON'}
              <input
                type="file"
                hidden
                accept="application/json"
                onChange={handleRawDataChange}
              />
            </Button>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Transformed Topic Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={transformedTopicName}
              onChange={(e) => setTransformedTopicName(e.target.value)}
              placeholder="Enter transformed topic name..."
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
              {transformedData ? transformedData.name : 'Choose Transformed Data JSON'}
              <input
                type="file"
                hidden
                accept="application/json"
                onChange={handleTransformedDataChange}
              />
            </Button>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
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
            {loading ? <CircularProgress size={24} /> : 'Convert'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}; 