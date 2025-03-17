import React from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  Paper, 
  useTheme, 
  IconButton, 
  Tooltip, 
  Grow,
  Chip
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content, isDarkMode }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        p: ({ children }) => (
          <Typography component="p" sx={{ mb: 1.5, lineHeight: 1.6 }}>
            {children}
          </Typography>
        ),
        h1: ({ children }) => (
          <Typography variant="h5" component="h1" sx={{ 
            mb: 2, 
            mt: 1, 
            fontWeight: 'bold',
            borderBottom: '1px solid',
            borderColor: 'divider',
            pb: 1
          }}>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant="h6" component="h2" sx={{ 
            mb: 1.5, 
            mt: 1, 
            fontWeight: 'bold',
            borderBottom: '1px solid',
            borderColor: 'divider',
            pb: 0.5
          }}>
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant="subtitle1" component="h3" sx={{ mb: 1, mt: 1, fontWeight: 'bold' }}>
            {children}
          </Typography>
        ),
        code: ({ node, inline, className, children }) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          
          if (inline) {
            return (
              <Box
                component="code"
                sx={{
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                  borderRadius: 1,
                  p: 0.5,
                  display: 'inline',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                {children}
              </Box>
            );
          }
          
          return (
            <Box sx={{ 
              my: 2, 
              borderRadius: 2, 
              overflow: 'hidden',
              position: 'relative'
            }}>
              {language && (
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  zIndex: 1, 
                  p: 0.5,
                  pr: 1.5
                }}>
                  <Chip 
                    label={language} 
                    size="small" 
                    sx={{ 
                      height: 20, 
                      fontSize: '0.7rem',
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                    }} 
                  />
                </Box>
              )}
              <SyntaxHighlighter
                style={isDarkMode ? atomDark : oneLight}
                language={language || 'javascript'}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  boxShadow: isDarkMode ? 'inset 0 0 10px rgba(0, 0, 0, 0.2)' : 'inset 0 0 10px rgba(0, 0, 0, 0.05)'
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </Box>
          );
        },
        ul: ({ children }) => (
          <Box component="ul" sx={{ pl: 2, mb: 1.5 }}>
            {children}
          </Box>
        ),
        li: ({ children }) => (
          <Box component="li" sx={{ mb: 0.75 }}>
            {children}
          </Box>
        ),
        a: ({ children, href }) => (
          <Box
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '1px',
                bottom: 0,
                left: 0,
                backgroundColor: 'primary.main',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.3s ease'
              },
              '&:hover': {
                textDecoration: 'none',
                '&:after': {
                  transform: 'scaleX(1)',
                  transformOrigin: 'bottom left'
                }
              },
            }}
          >
            {children}
          </Box>
        ),
        blockquote: ({ children }) => (
          <Box
            component="blockquote"
            sx={{
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              pl: 2,
              py: 0.5,
              my: 2,
              bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              borderRadius: '0 4px 4px 0'
            }}
          >
            {children}
          </Box>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const ChatMessage = ({ message, isUser }) => {
  const theme = useTheme();
  const [copied, setCopied] = React.useState(false);
  const isDarkMode = theme.palette.mode === 'dark';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Grow in={true} timeout={500}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          mb: 2,
          flexDirection: isUser ? 'row-reverse' : 'row',
          '&:hover .copy-button': {
            opacity: 1
          },
          '&:hover .message-time': {
            opacity: 1
          }
        }}
      >
        <Avatar
          sx={{
            bgcolor: isUser 
              ? theme.palette.primary.main 
              : theme.palette.secondary.main,
            m: 1,
            boxShadow: theme.shadows[2],
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: theme.shadows[4]
            }
          }}
        >
          {isUser ? <PersonIcon /> : <SmartToyIcon />}
        </Avatar>
        <Box sx={{ position: 'relative', maxWidth: '85%' }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: isUser 
                ? `${theme.palette.primary.main}15` 
                : isDarkMode 
                  ? `${theme.palette.background.paper}` 
                  : `${theme.palette.background.paper}`,
              borderRadius: 2,
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: theme.shadows[4],
                transform: 'translateY(-2px)'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 20,
                [isUser ? 'right' : 'left']: -10,
                border: '5px solid transparent',
                borderRightColor: isUser ? 'transparent' : isDarkMode 
                  ? theme.palette.background.paper 
                  : theme.palette.background.paper,
                borderLeftColor: isUser 
                  ? `${theme.palette.primary.main}15` 
                  : 'transparent'
              },
              borderLeft: isUser 
                ? 'none' 
                : `4px solid ${theme.palette.secondary.main}`,
              borderRight: isUser 
                ? `4px solid ${theme.palette.primary.main}` 
                : 'none'
            }}
          >
            <Box 
              sx={{ 
                color: isUser 
                  ? theme.palette.text.primary
                  : theme.palette.text.primary,
                '& pre': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.04)',
                  borderRadius: 1,
                  padding: 2,
                  overflowX: 'auto'
                }
              }}
            >
              <MarkdownRenderer content={message} isDarkMode={isDarkMode} />
            </Box>
            <Tooltip title={copied ? "Copied!" : "Copy message"}>
              <IconButton
                size="small"
                onClick={handleCopy}
                className="copy-button"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  opacity: 0,
                  transition: 'all 0.2s ease',
                  bgcolor: theme.palette.background.paper,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {copied ? <DoneIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Paper>
          <Box 
            className="message-time"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 0.5, 
              justifyContent: isUser ? 'flex-end' : 'flex-start',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              color: 'text.secondary',
              fontSize: '0.75rem'
            }}
          >
            <AccessTimeIcon sx={{ fontSize: '0.875rem', mr: 0.5, opacity: 0.7 }} />
            <Typography variant="caption">{currentTime}</Typography>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};

export default ChatMessage; 