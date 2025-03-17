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
        transition: 'all 0.2s ease',
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
            transition: 'opacity 0.2s ease'
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
      <AccordionDetails sx={{ p: 0, pt: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ mb: 0.5 }}>
              Model
            </Typography>
            <InfoTooltip title="Select the AI model to use for generating responses" />
          </Box>
          <Select
            fullWidth
            size="small"
            value={settings.selectedModel}
            onChange={handleModelChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  width: 250
                }
              }
            }}
            sx={{ 
              fontSize: '0.875rem',
              '& .MuiSelect-select': { py: 1 }
            }}
            renderValue={(selected) => {
              const model = MODELS.find(m => m.value === selected);
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SmartToyOutlinedIcon fontSize="small" />
                  <Typography variant="body2" noWrap>{model?.label}</Typography>
                </Box>
              );
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
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('chatSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });
  
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', title: 'Chat 1', timestamp: Date.now() - 2000 },
    { id: '2', title: 'Chat 2', timestamp: Date.now() - 1000 },
    { id: '3', title: 'Chat 3', timestamp: Date.now() },
  ]);
  
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
    <Box 
      sx={{ 
        width: 280,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.palette.mode === 'dark' 
          ? 'inset -5px 0 10px -5px rgba(0,0,0,0.2)' 
          : 'inset -5px 0 10px -5px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -100, 
          left: -100, 
          width: 200, 
          height: 200, 
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
          zIndex: 0
        }} 
      />
      
      <Box p={2} position="relative" zIndex={1}>
        <Button 
          variant="contained" 
          fullWidth 
          startIcon={<AddIcon />}
          onClick={handleNewChat}
          sx={{ 
            mb: 2,
            py: 1,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #7986cb, #64b5f6)'
              : 'linear-gradient(45deg, #1976d2, #2196f3)',
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #5c6bc0, #42a5f5)'
                : 'linear-gradient(45deg, #1565c0, #1e88e5)',
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[8]
            },
            transition: 'all 0.3s ease',
            boxShadow: theme.shadows[4]
          }}
        >
          New Chat
        </Button>
      </Box>
      <Divider />
      
      {/* Settings Section */}
      <Box sx={{ p: 2, position: 'relative', zIndex: 1 }}>
        <SettingsSection
          settings={settings}
          onChange={handleSettingsChange}
          onSave={handleSettingsSave}
          onReset={handleSettingsReset}
        />
      </Box>
      <Divider />
      
      {/* Chat List */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          px: 1, 
          py: 1,
          position: 'relative',
          zIndex: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? '#555' : '#bbb',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.mode === 'dark' ? '#777' : '#999',
          },
        }}
      >
        <Typography 
          variant="overline" 
          sx={{ 
            display: 'block', 
            px: 2, 
            opacity: 0.7, 
            fontSize: '0.7rem',
            letterSpacing: 1
          }}
        >
          Recent Chats
        </Typography>
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
      
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: -50, 
          right: -50, 
          width: 200, 
          height: 200, 
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 70%)`,
          zIndex: 0
        }} 
      />
    </Box>
  );
};

export default Sidebar; 