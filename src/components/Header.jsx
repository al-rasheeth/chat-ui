import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  useTheme, 
  Tooltip,
  Zoom,
  Badge,
  Avatar
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ toggleTheme, isDarkMode }) => {
  const theme = useTheme();
  
  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(8px)',
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(30, 30, 30, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              mr: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(25, 118, 210, 0.1)' 
                  : 'rgba(25, 118, 210, 0.05)',
                mr: 1.5,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -15,
                  left: -15,
                  right: -15,
                  bottom: -15,
                  background: `linear-gradient(45deg, 
                    ${theme.palette.primary.main}, 
                    ${theme.palette.primary.light}, 
                    ${theme.palette.secondary.main}, 
                    ${theme.palette.primary.main})`,
                  backgroundSize: '400% 400%',
                  animation: 'gradientAnimation 8s ease infinite',
                  opacity: 0.3,
                  borderRadius: '50%',
                }
              }}
            >
              <SmartToyOutlinedIcon 
                sx={{ 
                  fontSize: 24, 
                  color: theme.palette.primary.main,
                  filter: 'drop-shadow(0 0 2px rgba(25, 118, 210, 0.5))',
                  zIndex: 1
                }} 
              />
            </Box>
            <Typography 
              variant="h6" 
              component="div" 
              className="animated-gradient-text"
              sx={{ 
                fontWeight: 700,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, #90caf9, #42a5f5, #64b5f6, #90caf9)'
                  : 'linear-gradient(45deg, #1976d2, #42a5f5, #1976d2, #42a5f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}
            >
              AI Chat
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Tooltip title="Help" TransitionComponent={Zoom}>
              <IconButton 
                color="inherit"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: theme.palette.primary.main
                  }
                }}
              >
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="View on GitHub" TransitionComponent={Zoom}>
              <IconButton 
                color="inherit"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: theme.palette.primary.main
                  }
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications" TransitionComponent={Zoom}>
              <IconButton 
                color="inherit"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: theme.palette.primary.main
                  }
                }}
              >
                <Badge color="error" variant="dot">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} TransitionComponent={Zoom}>
              <IconButton 
                onClick={toggleTheme} 
                color="inherit"
                sx={{
                  transition: 'all 0.3s ease',
                  transform: isDarkMode ? 'rotate(180deg)' : 'rotate(0deg)',
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }}
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account" TransitionComponent={Zoom}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  ml: 0.5,
                  cursor: 'pointer',
                  bgcolor: theme.palette.primary.main,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: theme.shadows[3]
                  }
                }}
              >
                <AccountCircleIcon fontSize="small" />
              </Avatar>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 