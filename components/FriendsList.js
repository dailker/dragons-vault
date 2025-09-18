import React, { useState, useEffect } from 'react';

export default function FriendsList({ username }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const profileUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${username}`;

  useEffect(() => {
    if (searchQuery.trim()) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search-users?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (targetUser) => {
    try {
      await fetch('/api/send-friend-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: username, to: targetUser })
      });
      alert('Friend request sent!');
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Add Friends</h2>
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="filter-btn" title="Search">
          🔍
        </button>
      </div>
      
      <div className="friends-content">
        {searchQuery.trim() ? (
          <div className="conversations">
            {loading ? (
              <div className="no-conversations">
                <div className="loading-spinner"></div>
                <p>Searching...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="no-conversations">
                <div className="no-conv-icon">🔍</div>
                <p>No users found</p>
                <span>Try a different username</span>
              </div>
            ) : (
              searchResults.map(user => (
                <div key={user.username} className="conversation-card">
                  <div className="conv-avatar">{user.avatar}</div>
                  <div className="conv-info">
                    <div className="conv-username">{user.username}</div>
                    <div className="conv-last-message">{user.fullName || user.username}</div>
                  </div>
                  <button 
                    className="add-friend-btn"
                    onClick={() => handleSendRequest(user.username)}
                  >
                    +
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            <hr className="friends-divider" />
            
            <div className="qr-section-friends">
              <h3>📱 Share Your Profile</h3>
              <div className="qr-code-container">
                <div className="qr-placeholder">
                  <div className="qr-pattern">
                    {Array.from({length: 25}).map((_, i) => (
                      <div key={i} className={`qr-dot ${Math.random() > 0.5 ? 'filled' : ''}`}></div>
                    ))}
                  </div>
                </div>
                <p className="profile-url">{profileUrl}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}