import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import FriendsList from './FriendsList';
import FriendRequests from './FriendRequests';
import ChatArea from './ChatArea';
import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';

export default function MainLayout({ username, onLogout }) {
  const [activeTab, setActiveTab] = useState('chat');
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [friendRequestCount, setFriendRequestCount] = useState(0);

  useEffect(() => {
    fetchFriendRequestCount();
  }, []);

  const fetchFriendRequestCount = async () => {
    try {
      const response = await fetch(`/api/friend-requests?username=${username}`);
      const data = await response.json();
      setFriendRequestCount(data.length);
    } catch (error) {
      console.error('Failed to fetch request count:', error);
    }
  };

  const renderSecondPanel = () => {
    switch(activeTab) {
      case 'friends':
        return <FriendsList username={username} />;
      case 'requests':
        return <FriendRequests />;
      default:
        return (
          <ChatList 
            onChatSelect={setSelectedChat}
            selectedChat={selectedChat}
            onStartNewChat={() => setActiveTab('friends')}
            username={username}
          />
        );
    }
  };

  return (
    <div className="main-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onProfileClick={() => setShowProfile(true)}
        onSettingsClick={() => setShowSettings(true)}
        onLogout={onLogout}
        username={username}
        friendRequestCount={friendRequestCount}
      />
      
      {renderSecondPanel()}
      
      <ChatArea 
        selectedChat={selectedChat}
        username={username}
      />
      
      {showProfile && (
        <ProfileModal 
          username={username}
          onClose={() => setShowProfile(false)}
        />
      )}
      
      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
Transport** | TLS 1.3 | 256-bit |

uestCount}</span>
          </button>
     

{ EnvChecker } from '../../lib/env-check';

export

les
    if (!process.env.MONG

ch": "jest --watch"
  },
  "dependencies": {

 Date.now }
});

const chatSchema = new 

ved": "https://registry.npmjs.org/@babe
