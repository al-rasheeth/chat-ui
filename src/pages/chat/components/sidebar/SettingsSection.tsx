import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import React from 'react';
import { InfoTooltip } from '../../../../components';
import { MODELS } from './constants';
import { SettingsSectionProps } from './types';

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  settings,
  onChange,
  onSave,
  onReset
}) => {
  const theme = useTheme();

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    onChange({ selectedModel: event.target.value });
  };

  const handleSystemPromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ systemPrompt: event.target.value });
  };

  const handleSave = () => {
    onSave({ currentModel: settings.selectedModel, currentSystemPrompt: settings.systemPrompt });
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <Accordion
      sx={{
        '&.MuiAccordion-root': {
          background: 'transparent',
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          p: 0,
          minHeight: 40,
          '& .MuiAccordionSummary-content': { my: 0 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SettingsIcon sx={{ mr: 1 }} />
          <Typography>Settings</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ mb: 0.5 }}>
              Model
            </Typography>
            <InfoTooltip title="Select the AI model to use for conversations" />
          </Box>
          <Select
            fullWidth
            size="small"
            value={settings.selectedModel}
            onChange={handleModelChange}
            sx={{
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                }
              }
            }}
          >
            {MODELS.map((model) => (
              <MenuItem
                key={model.value}
                value={model.value}
                sx={{
                  display: 'block',
                  py: 1.5,
                  borderBottom: model.value !== MODELS[MODELS.length - 1].value ?
                    `1px solid ${alpha(theme.palette.divider, 0.5)}` : 'none'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <SmartToyOutlinedIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="body2" fontWeight={600}>{model.label}</Typography>
                </Box>
                {model.description && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{
                      ml: 4,
                      lineHeight: 1.3,
                      maxWidth: '100%',
                      whiteSpace: 'normal'
                    }}
                  >
                    {model.description}
                  </Typography>
                )}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ mb: 0.5 }}>
              System Prompt
            </Typography>
            <InfoTooltip title="Define the AI's behavior and context for all conversations" />
          </Box>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={4}
            value={settings.systemPrompt}
            onChange={handleSystemPromptChange}
            placeholder="Enter system prompt..."
            sx={{
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-root': {
                fontSize: '0.875rem',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            variant="contained"
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4]
              }
            }}
          >
            Save Settings
          </Button>
          <Button
            size="small"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            variant="outlined"
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            Reset
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}; 