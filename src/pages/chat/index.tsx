import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { ChatArea, Sidebar } from './components';
import { Header } from '../../components';

export const ChatPage: React.FC = () => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden'
          }}>
            <CssBaseline />
            <Header />
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              <Sidebar />
              <Box component="main" sx={{ flex: 1, overflow: 'auto' }}>
              <ChatArea />
              </Box>
            </Box>
          </Box>
    );
}; 