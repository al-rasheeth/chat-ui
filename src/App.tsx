import React from 'react';
import { 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  GlobalStyles
} from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#bbb',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#999',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },
          html: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            height: '100%',
            width: '100%',
          },
          body: {
            height: '100%',
            width: '100%',
            overflowX: 'hidden',
          },
          '#root': {
            height: '100%',
            width: '100%',
          },
        }}
      />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}>
        <Header />
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar />
          <ChatArea />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App; 