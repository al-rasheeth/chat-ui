import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import React from 'react';
import { Chat } from './types';

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  isActive,
  onSelect,
  onDelete,
}) => {
  const theme = useTheme();

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Tooltip title="Delete Chat">
          <IconButton
            edge="end"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            sx={{
              opacity: 0,
              transition: theme.transitions.create(['opacity'], {
                duration: theme.transitions.duration.shorter,
              }),
              '&:hover': {
                color: theme.palette.error.main,
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemButton
        selected={isActive}
        onClick={onSelect}
        sx={{
          borderRadius: 1,
          mx: 1,
          '&.Mui-selected': {
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.15),
            },
            '& .MuiListItemText-primary': {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
          },
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            '& .MuiListItemSecondaryAction-root': {
              opacity: 1,
            },
          },
        }}
      >
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                transition: theme.transitions.create(['color'], {
                  duration: theme.transitions.duration.shorter,
                }),
              }}
            >
              {chat.title}
            </Typography>
          }
          secondary={
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                mt: 0.5,
              }}
            >
              {new Date(chat.lastUpdated).toLocaleDateString()}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}; 