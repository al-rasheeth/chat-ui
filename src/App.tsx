import React from 'react';
import { 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  GlobalStyles,
  alpha
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
      error: {
        main: '#d32f2f',
      },
      warning: {
        main: '#ed6c02',
      },
      info: {
        main: '#0288d1',
      },
      success: {
        main: '#2e7d32',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 500,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 10,
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(0,0,0,0.05)',
      '0px 4px 8px rgba(0,0,0,0.08)',
      '0px 6px 12px rgba(0,0,0,0.1)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 10px 20px rgba(0,0,0,0.14)',
      '0px 12px 24px rgba(0,0,0,0.16)',
      '0px 14px 28px rgba(0,0,0,0.18)',
      '0px 16px 32px rgba(0,0,0,0.2)',
      '0px 18px 36px rgba(0,0,0,0.22)',
      '0px 20px 40px rgba(0,0,0,0.24)',
      '0px 22px 44px rgba(0,0,0,0.26)',
      '0px 24px 48px rgba(0,0,0,0.28)',
      '0px 26px 52px rgba(0,0,0,0.3)',
      '0px 28px 56px rgba(0,0,0,0.32)',
      '0px 30px 60px rgba(0,0,0,0.34)',
      '0px 32px 64px rgba(0,0,0,0.36)',
      '0px 34px 68px rgba(0,0,0,0.38)',
      '0px 36px 72px rgba(0,0,0,0.4)',
      '0px 38px 76px rgba(0,0,0,0.42)',
      '0px 40px 80px rgba(0,0,0,0.44)',
      '0px 42px 84px rgba(0,0,0,0.46)',
      '0px 44px 88px rgba(0,0,0,0.48)',
      '0px 46px 92px rgba(0,0,0,0.5)',
      '0px 48px 96px rgba(0,0,0,0.52)',
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
          },
          contained: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
          outlined: {
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          },
          elevation2: {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          elevation3: {
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          },
          elevation4: {
            boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
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
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 6,
            fontSize: '0.75rem',
            padding: '6px 10px',
            backgroundColor: alpha('#000', 0.8),
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
          '.MuiBox-root': {
            transition: 'background-color 0.3s ease',
          },
          '@keyframes gradientAnimation': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
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
        <Box sx={{ 
          display: 'flex', 
          flex: 1,
          overflow: 'hidden'
        }}>
          <Sidebar />
          <ChatArea />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App; 