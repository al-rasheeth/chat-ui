import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  Paper,
  Tooltip,
  Typography,
  useTheme,
  alpha,
  Drawer,
  Divider
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useChatStore } from '../../../../store/chatStore';
import { useUIStore } from '../../../../store/uiStore';
import { ChatListItem } from './ChatListItem';
import { SettingsSection } from './SettingsSection';
import { useSettingsStore } from '../../../../store/settingsStore';
import { MenuSection } from './MenuSection';
import { MenuType } from '../../../../store/types';

export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const { chats, addChat, deleteChat, fetchChats, isLoading, error } = useChatStore();
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { activeChatId, setActiveChat, isSidebarCollapsed, toggleSidebar, activeMenu, setActiveMenu } = useUIStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleNewChat = async () => {
    try {
      const newChatId = await addChat('New Chat');
      setActiveChat(newChatId);
      setActiveMenu(MenuType.CHAT);
    } catch (err) {
      console.error('Error creating new chat:', err);
    }
  };

  const handleDeleteChat = async (id: string) => {
    try {
      await deleteChat(id);
      if (activeChatId === id) {
        setActiveChat(null);
      }
    } catch (err) {
      console.error('Error deleting chat:', err);
    }
  };

  const renderNewChatButton = () => {
    if (activeMenu !== MenuType.CHAT) return null;

    if (!isSidebarCollapsed) {
      return (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewChat}
          fullWidth
          disabled={isLoading}
          sx={{
            background: `linear-gradient(45deg, 
              ${theme.palette.primary.main}, 
              ${theme.palette.primary.light})`,
            '&:hover': {
              background: `linear-gradient(45deg, 
                ${theme.palette.primary.dark}, 
                ${theme.palette.primary.main})`,
            }
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'New Chat'}
        </Button>
      );
    }

    return (
      <Tooltip title="New Chat">
        <IconButton
          onClick={handleNewChat}
          disabled={isLoading}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.15),
            }
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : <AddIcon />}
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          width: isSidebarCollapsed ? 64 : 280,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRight: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            background: `linear-gradient(to bottom, 
              ${alpha(theme.palette.primary.main, 0.1)}, 
              ${alpha(theme.palette.primary.main, 0.05)})`,
            opacity: isSidebarCollapsed ? 0 : 1,
            transition: theme.transitions.create(['opacity'], {
              duration: theme.transitions.duration.enteringScreen,
            }),
          }
        }}
      >
        <Box sx={{ 
          p: 2, 
          borderBottom: `1px solid ${theme.palette.divider}`, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '1px',
            background: `linear-gradient(to right, 
              ${alpha(theme.palette.divider, 0)}, 
              ${alpha(theme.palette.divider, 0.5)}, 
              ${alpha(theme.palette.divider, 0)})`,
          }
        }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'text.primary',
              display: isSidebarCollapsed ? 'none' : 'block',
            }}
          >
            Menu
          </Typography>
        </Box>

        {!isSidebarCollapsed ? (
          <>
            <MenuSection activeMenu={activeMenu} onMenuSelect={setActiveMenu} />
            
            {activeMenu === MenuType.CHAT && (
              <>
                <Box sx={{ px: 2, py: 1 }}>
                  {renderNewChatButton()}
                </Box>

                <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
                  <List sx={{ p: 0 }}>
                    {chats.map((chat) => (
                      <ChatListItem
                        key={chat.id}
                        chat={chat}
                        isActive={activeChatId === chat.id}
                        onSelect={() => setActiveChat(chat.id)}
                        onDelete={() => handleDeleteChat(chat.id)}
                      />
                    ))}
                  </List>
                </Box>

                <Box sx={{
                  p: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '1px',
                    background: `linear-gradient(to right, 
                      ${alpha(theme.palette.divider, 0)}, 
                      ${alpha(theme.palette.divider, 0.5)}, 
                      ${alpha(theme.palette.divider, 0)})`,
                  }
                }}>
                  <SettingsSection 
                    settings={settings}
                    onChange={updateSettings}
                    onSave={updateSettings}
                    onReset={resetSettings}
                  />
                </Box>
              </>
            )}
          </>
        ) : (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            gap: 2
          }}>
            <MenuSection activeMenu={activeMenu} onMenuSelect={setActiveMenu} />
            {activeMenu === MenuType.CHAT && (
              <Box sx={{ mt: 1 }}>
                {renderNewChatButton()}
              </Box>
            )}
            <Box sx={{ mt: 'auto', mb: 2 }}>
              <Tooltip title="Settings">
                <IconButton
                  onClick={() => setIsSettingsOpen(true)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    color: 'text.secondary',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Paper>

      <Tooltip title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: 'absolute',
            right: -16,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.1)}`,
            zIndex: 1,
            '&:hover': {
              bgcolor: theme.palette.background.paper,
              borderColor: theme.palette.primary.main,
              boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.15)}`,
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
              duration: theme.transitions.duration.shorter,
            })
          }}
        >
          {isSidebarCollapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="right"
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: theme.palette.background.paper,
            borderLeft: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={() => setIsSettingsOpen(false)}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <SettingsSection 
            settings={settings}
            onChange={updateSettings}
            onSave={updateSettings}
            onReset={resetSettings}
          />
        </Box>
      </Drawer>
    </Box>
  );
};
