import ChatIcon from '@mui/icons-material/Chat';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { MenuType } from '../../../../store/types';
import { useUIStore } from '../../../../store/uiStore';

interface MenuSectionProps {
  activeMenu: MenuType;
  onMenuSelect: (menu: MenuType) => void;
}

const menuItems = [
  {
    id: MenuType.CHAT,
    label: 'Chat',
    icon: <ChatIcon />,
  },
  {
    id: MenuType.FEEM_CONVERSION,
    label: 'Feem Conversion',
    icon: <SwapHorizIcon />,
  },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ activeMenu, onMenuSelect }) => {
  const theme = useTheme();
  const { isSidebarCollapsed } = useUIStore();

  return (
    <Box sx={{ mb: 2 }}>
      {!isSidebarCollapsed && (
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 1,
            display: 'block',
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Applications
        </Typography>
      )}
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Tooltip title={isSidebarCollapsed ? item.label : ''} placement="right">
              <ListItemButton
                selected={activeMenu === item.id}
                onClick={() => onMenuSelect(item.id)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  minHeight: 40,
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiListItemText-primary': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: 'text.secondary',
                    transition: theme.transitions.create(['color'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isSidebarCollapsed && (
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.875rem',
                        transition: theme.transitions.create(['color'], {
                          duration: theme.transitions.duration.shorter,
                        }),
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 