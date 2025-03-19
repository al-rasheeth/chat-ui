import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  List,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { ChatListItem } from './ChatListItem';
import { SettingsSection } from './SettingsSection';
import { DEFAULT_SETTINGS } from './constants';
import { Chat, Settings } from './types';

export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [chats, setChats] = useState<Chat[]>([]);
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('chatSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });
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
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 1,
            color: 'text.secondary',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 0.5
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
