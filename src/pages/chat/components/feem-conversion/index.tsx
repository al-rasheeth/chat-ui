import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
  Alert,
  CircularProgress,
  Fade,
  Grow,
  Container,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Collapse,
} from '@mui/material';
import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import JSZip from 'jszip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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
  const [convertedFiles, setConvertedFiles] = useState<ConversionResponse | null>(null);
  const [showFiles, setShowFiles] = useState(false);

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

  const downloadIndividualFile = (fileName: string, content: any) => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const createAndDownloadZip = async (response: ConversionResponse) => {
    const zip = new JSZip();
    
    Object.entries(response).forEach(([key, value]) => {
      zip.file(`${key}.json`, JSON.stringify(value, null, 2));
    });

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
      setConvertedFiles(result);
      setShowFiles(true);
      await createAndDownloadZip(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(12px)',
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AutoAwesomeIcon sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
              <Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Feem Conversion
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Transform your JSON data with our powerful conversion tool
                </Typography>
              </Box>
            </Box>

            {error && (
              <Grow in timeout={300}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              </Grow>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Grow in timeout={800} style={{ transitionDelay: '200ms' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Raw Topic Name
                    </Typography>
                    <Tooltip title="Enter the original topic name from your raw data">
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <InfoIcon fontSize="small" color="action" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    size="medium"
                    value={rawTopicName}
                    onChange={(e) => setRawTopicName(e.target.value)}
                    placeholder="Enter raw topic name..."
                    sx={{ mb: 2 }}
                  />
                  <Button
                    component="label"
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      textTransform: 'none',
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      color: theme.palette.primary.main,
                      py: 1.5,
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
              </Grow>

              <Grow in timeout={800} style={{ transitionDelay: '400ms' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Transformed Topic Name
                    </Typography>
                    <Tooltip title="Enter the desired topic name for the transformed data">
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <InfoIcon fontSize="small" color="action" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    size="medium"
                    value={transformedTopicName}
                    onChange={(e) => setTransformedTopicName(e.target.value)}
                    placeholder="Enter transformed topic name..."
                    sx={{ mb: 2 }}
                  />
                  <Button
                    component="label"
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      textTransform: 'none',
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      color: theme.palette.primary.main,
                      py: 1.5,
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
              </Grow>

              <Grow in timeout={800} style={{ transitionDelay: '600ms' }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    background: `linear-gradient(45deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.primary.light})`,
                    '&:hover': {
                      background: `linear-gradient(45deg, 
                        ${theme.palette.primary.dark}, 
                        ${theme.palette.primary.main})`,
                    },
                    '&:disabled': {
                      background: theme.palette.grey[300],
                    },
                  }}
                >
                  {loading ? 'Converting...' : 'Convert Data'}
                </Button>
              </Grow>

              <Collapse in={showFiles} timeout="auto" unmountOnExit>
                <Grow in timeout={800} style={{ transitionDelay: '800ms' }}>
                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <FolderZipIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Converted Files
                      </Typography>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: alpha(theme.palette.background.paper, 0.5),
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      }}
                    >
                      <List>
                        {convertedFiles && Object.entries(convertedFiles).map(([fileName, content], index) => (
                          <React.Fragment key={fileName}>
                            <ListItem
                              sx={{
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                                },
                              }}
                            >
                              <ListItemText
                                primary={fileName}
                                secondary={`${JSON.stringify(content).length} bytes`}
                              />
                              <ListItemSecondaryAction>
                                <Tooltip title="Download file">
                                  <IconButton
                                    edge="end"
                                    onClick={() => downloadIndividualFile(fileName, content)}
                                    sx={{
                                      color: theme.palette.primary.main,
                                      '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                      },
                                    }}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                </Tooltip>
                              </ListItemSecondaryAction>
                            </ListItem>
                            {index < Object.keys(convertedFiles).length - 1 && (
                              <Divider sx={{ my: 0.5 }} />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    </Paper>
                    <Button
                      variant="outlined"
                      startIcon={<FileDownloadIcon />}
                      onClick={() => convertedFiles && createAndDownloadZip(convertedFiles)}
                      sx={{
                        mt: 2,
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        },
                      }}
                    >
                      Download All Files
                    </Button>
                  </Box>
                </Grow>
              </Collapse>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
}; 