import React, { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Button,
  Divider,
  useTheme,
  Tooltip,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  SelectChangeEvent,
  Paper,
  Fade,
  Chip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

// Types
interface Chat {
  id: string;
  title: string;
  timestamp: number;
}

interface Model {
  value: string;
  label: string;
  description?: string;
}

interface Settings {
  systemPrompt: string;
  selectedModel: string;
}

// Constants
const MODELS: Model[] = [
  { 
    value: 'gpt-4',
    label: 'GPT-4',
    description: 'Most capable GPT model for complex tasks'
  },
  { 
    value: 'gpt-3.5-turbo',
    label: 'GPT-3.5 Turbo',
    description: 'Faster and more cost-effective for simpler tasks'
  },
  { 
    value: 'claude-3-opus',
    label: 'Claude 3 Opus',
    description: 'Most powerful Claude model with enhanced capabilities'
  },
  { 
    value: 'claude-3-sonnet',
    label: 'Claude 3 Sonnet',
    description: 'Balanced Claude model for most use cases'
  },
];

const DEFAULT_SETTINGS: Settings = {
  systemPrompt: '',
  selectedModel: 'gpt-4'
};

// Helper Components
const InfoTooltip: React.FC<{ title: string }> = ({ title }) => (
  <Tooltip title={title}>
    <IconButton size="small" sx={{ ml: 0.5, opacity: 0.7 }}>
      <HelpOutlineIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

interface ChatListItemProps {
  chat: Chat;
  onDelete: (id: string) => void;
  isActive?: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ 
  chat, 
  onDelete, 
  isActive, 
  onClick 
}) => {
  const theme = useTheme();
  
  return (
    <ListItem 
      component="div"
      onClick={onClick}
      sx={{
        backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
        cursor: 'pointer',
        borderRadius: 1,
        mb: 0.5,
        '&:hover': {
          backgroundColor: isActive 
            ? alpha(theme.palette.primary.main, 0.15)
            : theme.palette.action.hover,
          transform: 'translateX(4px)',
          '& .delete-icon': {
            opacity: 1
          }
        }
      }}
    >
      <ListItemIcon>
        <ChatIcon color={isActive ? "primary" : "inherit"} />
      </ListItemIcon>
      <ListItemText 
        primary={chat.title}
        secondary={new Date(chat.timestamp).toLocaleDateString()}
        primaryTypographyProps={{
          noWrap: true,
          style: {
            fontWeight: isActive ? 600 : 500,
            fontSize: '0.9rem'
          }
        }}
        secondaryTypographyProps={{
          noWrap: true,
          style: {
            fontSize: '0.75rem'
          }
        }}
        sx={{
          overflow: 'hidden'
        }}
      />
      <Tooltip title="Delete chat">
        <IconButton 
          size="small"
          className="delete-icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(chat.id);
          }}
          sx={{ 
            opacity: 0,
            '&:hover': {
              color: theme.palette.error.main
            }
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

interface SettingsSectionProps {
  settings: Settings;
  onChange: (settings: Partial<Settings>) => void;
  onSave: () => void;
  onReset: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ 
  settings, 
  onChange, 
  onSave, 
  onReset 
}) => {
  const theme = useTheme();
  const handleModelChange = (event: SelectChangeEvent<string>) => {
    onChange({ selectedModel: event.target.value });
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
                transition: 'all 0.3s ease',
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
                  borderBottom: model.value !== MODELS[MODELS.length-1].value ? 
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
            onChange={(e) => onChange({ systemPrompt: e.target.value })}
            placeholder="Enter system prompt..."
            sx={{ 
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-root': {
                fontSize: '0.875rem',
                transition: 'all 0.3s ease',
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
            onClick={onSave}
            variant="contained"
            sx={{
              transition: 'all 0.2s ease',
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
            onClick={onReset}
            variant="outlined"
            sx={{
              transition: 'all 0.2s ease',
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

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [chats, setChats] = useState<Chat[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const handleSettingsChange = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleSettingsSave = () => {
    localStorage.setItem('chatSettings', JSON.stringify(settings));
  };

  const handleSettingsReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('chatSettings');
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      timestamp: Date.now()
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  const handleDeleteChat = (id: string) => {
    setChats(prev => prev.filter(chat => chat.id !== id));
    if (activeChat === id) {
      setActiveChat(null);
    }
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewChat}
          fullWidth
          sx={{ mb: 1 }}
        >
          New Chat
        </Button>
      </Box>
      
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        px: 1,
        py: 1
      }}>
        <List>
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              onDelete={handleDeleteChat}
              isActive={activeChat === chat.id}
              onClick={() => setActiveChat(chat.id)}
            />
          ))}
        </List>
      </Box>

      <Box sx={{ 
        p: 2, 
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper
      }}>
        <SettingsSection
          settings={settings}
          onChange={handleSettingsChange}
          onSave={handleSettingsSave}
          onReset={handleSettingsReset}
        />
      </Box>
    </Paper>
  );
};

export default Sidebar; 