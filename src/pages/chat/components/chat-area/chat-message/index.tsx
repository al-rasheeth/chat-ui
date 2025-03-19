import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import {
  Avatar,
  Box,
  Chip,
  Grow,
  IconButton,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
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
        code: ({ node, inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & {
          inline?: boolean;
          node?: any;
        }) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';

          if (inline) {
            return (
              <Box
                component="code"
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
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
                      backgroundColor: 'rgba(0, 0, 0, 0.06)',
                      color: 'rgba(0, 0, 0, 0.7)'
                    }}
                  />
                </Box>
              )}
              <SyntaxHighlighter
                style={oneLight}
                language={language || 'javascript'}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.05)'
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
              bgcolor: 'rgba(0, 0, 0, 0.02)',
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

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const theme = useTheme();
  const [copied, setCopied] = React.useState<boolean>(false);
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
                : `${theme.palette.background.paper}`,
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <MarkdownRenderer content={message} />
            <Box
              className="message-time"
              sx={{
                position: 'absolute',
                bottom: -20,
                right: isUser ? 'auto' : 0,
                left: isUser ? 0 : 'auto',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                fontSize: '0.75rem'
              }}
            >
              <AccessTimeIcon sx={{ fontSize: '0.875rem' }} />
              {currentTime}
            </Box>
            <IconButton
              className="copy-button"
              size="small"
              onClick={handleCopy}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                opacity: 0,
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              {copied ? <DoneIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </Grow>
  );
};
