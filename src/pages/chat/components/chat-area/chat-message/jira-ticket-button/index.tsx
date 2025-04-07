import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';

interface JiraTicketButtonProps {
  message: string;
}

declare global {
  interface Window {
    JIRA: {
      TicketCollector: {
        show: (options: {
          summary: string;
          description: string;
          issueType: string;
        }) => void;
      };
    };
  }
}

export const JiraTicketButton: React.FC<JiraTicketButtonProps> = ({ message }) => {
  useEffect(() => {
    // Load Ticket Collector script
    const script = document.createElement('script');
    script.src = 'https://your-jira-instance.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e/en_US1-0-0/_/download/resources/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/collector.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCreateTicket = () => {
    if (window.JIRA?.TicketCollector) {
      window.JIRA.TicketCollector.show({
        summary: 'Chat Message Issue',
        description: message,
        issueType: '10001' // Bug issue type ID
      });
    } else {
      console.error('Ticket Collector not loaded');
    }
  };

  return (
    <Tooltip title="Create JIRA Ticket">
      <IconButton
        size="small"
        onClick={handleCreateTicket}
        sx={{
          position: 'absolute',
          right: 8,
          bottom: 8,
          opacity: 0,
          transition: 'opacity 0.2s ease-in-out',
          '.message-content:hover &': {
            opacity: 1
          }
        }}
      >
        <BugReportIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}; 