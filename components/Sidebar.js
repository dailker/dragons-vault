import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, onProfileClick, onSettingsClick, onLogout, username, friendRequestCount = 0 }) {
  const getAvatar = () => '🦕'; // Default dinosaur emoji

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <button 
          className={`sidebar-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
          title="Chats"
        >
          💬
        </button>
        
        <button 
          className={`sidebar-btn ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
          title="Friends"
        >
          👥
        </button>
        
        {friendRequestCount > 0 && (
          <button 
            className="sidebar-btn friend-requests"
            onClick={() => setActiveTab('requests')}
            title={`Friend Requests (${friendRequestCount})`}
          >
            📬
            <span className="badge">{friendRequestCount}</span>
          </button>
        )}
      </div>
      
      <div className="sidebar-bottom">
        <button 
          className="sidebar-btn"
          onClick={onSettingsClick}
          title="Settings"
        >
          ⚙️
        </button>
        
        <button 
          className="sidebar-btn profile-btn"
          onClick={onProfileClick}
          title="Profile"
        >
          <span className="avatar">{getAvatar()}</span>
        </button>
        
        <button 
          className="sidebar-btn logout-btn"
          onClick={onLogout}
          title="Logout"
        >
          🚪
        </button>
      </div>
    </div>
  );
}