import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  List,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { ChatListItem } from './ChatListItem';
import { SettingsSection } from './SettingsSection';
import { useChatStore } from '../../../../store/chatStore';
import { useSettingsStore } from '../../../../store/settingsStore';
import { useUIStore } from '../../../../store/uiStore';

export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const { chats, addChat, deleteChat } = useChatStore();
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { activeChatId, setActiveChat } = useUIStore();

  const handleNewChat = () => {
    const newChatId = addChat(`Chat ${chats.length + 1}`);
    setActiveChat(newChatId);
  };

  const handleDeleteChat = (id: string) => {
    deleteChat(id);
    if (activeChatId === id) {
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
              isActive={activeChatId === chat.id}
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
          onChange={updateSettings}
          onSave={() => {}}
          onReset={resetSettings}
        />
      </Box>
    </Paper>
  );
};
