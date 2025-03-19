import ChatIcon from '@mui/icons-material/Chat';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { alpha, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip, useTheme } from '@mui/material';
import { ChatListItemProps } from '../types';

export const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  onDelete,
  isActive,
  onClick
}) => {
  const theme = useTheme();

  return (
    <ListItem
      component="div"
      onClick={onClick}
      sx={{
        backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
        cursor: 'pointer',
        borderRadius: 1,
        mb: 0.5,
        '&:hover': {
          backgroundColor: isActive
            ? alpha(theme.palette.primary.main, 0.15)
            : theme.palette.action.hover,
          transform: 'translateX(4px)',
          '& .delete-icon': {
            opacity: 1
          }
        }
      }}
    >
      <ListItemIcon>
        <ChatIcon color={isActive ? "primary" : "inherit"} />
      </ListItemIcon>
      <ListItemText
        primary={chat.title}
        secondary={new Date(chat.timestamp).toLocaleDateString()}
        primaryTypographyProps={{
          noWrap: true,
          style: {
            fontWeight: isActive ? 600 : 500,
            fontSize: '0.9rem'
          }
        }}
        secondaryTypographyProps={{
          noWrap: true,
          style: {
            fontSize: '0.75rem'
          }
        }}
        sx={{
          overflow: 'hidden'
        }}
      />
      <Tooltip title="Delete chat">
        <IconButton
          size="small"
          className="delete-icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(chat.id);
          }}
          sx={{
            opacity: 0,
            '&:hover': {
              color: theme.palette.error.main
            }
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}; 