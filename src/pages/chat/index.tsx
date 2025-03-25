import { Box, useTheme } from '@mui/material';
import React from 'react';
import { Header } from '../../components/header';
import { Sidebar } from './components/sidebar';
import { ChatArea } from './components/chat-area';
import { FeemConversion } from './components/feem-conversion';
import { useUIStore } from '../../store/uiStore';
import { MenuType } from '../../store/types';

export const ChatPage: React.FC = () => {
  const theme = useTheme();
  const { activeMenu } = useUIStore();

  const renderContent = () => {
    switch (activeMenu) {
      case MenuType.CHAT:
        return <ChatArea />;
      case MenuType.FEEM_CONVERSION:
        return <FeemConversion />;
      default:
        return <ChatArea />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}; 