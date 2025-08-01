import React, { useState, useEffect } from 'react';
import { SecureStorage } from '../lib/storage';

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const username = SecureStorage.getItem('userId');
      const response = await fetch(`/api/friend-requests?username=${username}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const currentUser = SecureStorage.getItem('userId');
      const request = requests.find(req => req.id === requestId);
      
      await fetch('/api/friend-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'accept', 
          requestId,
          acceptedBy: currentUser,
          requestFrom: request.username
        })
      });
      
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await fetch('/api/friend-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decline', requestId })
      });
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Failed to decline request:', error);
    }
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Friend Requests</h2>
      </div>
      
      <div className="conversations">
        {loading ? (
          <div className="no-conversations">
            <div className="loading-spinner"></div>
            <p>Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="no-conversations">
            <div className="no-conv-icon">📬</div>
            <p>No friend requests</p>
            <span>New requests will appear here</span>
          </div>
        ) : (
          requests.map(request => (
            <div key={request.id} className="friend-request-card">
              <div className="request-info">
                <div className="conv-avatar">{request.avatar}</div>
                <div className="conv-info">
                  <div className="conv-username">{request.username}</div>
                  <div className="conv-last-message">{request.timestamp}</div>
                </div>
              </div>
              <div className="request-actions">
                <button 
                  className="accept-btn"
                  onClick={() => handleAccept(request.id)}
                >
                  ✓
                </button>
                <button 
                  className="decline-btn"
                  onClick={() => handleDecline(request.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
ancel</butt


          isSystemMessage: { type: Boolean, default: f

therUser,
         

essage });
  }
});

const P

lUtil.encodeBase64(nonce)
 

a);

export default async function

from '../../lib/env-check';

export default a

text"
          placeholder="Search conversations..."
  
