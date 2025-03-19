import { Box } from '@mui/material';
import React from 'react';
import ChatArea from './components/ChatArea';

const ChatPage: React.FC = () => {
    return (
        <Box sx={{ height: '100%' }}>
            <ChatArea />
        </Box>
    );
};

export default ChatPage; 