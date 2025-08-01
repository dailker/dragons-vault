import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SecureStorage } from '../../lib/storage';

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (username) {
      fetchProfile();
      setCurrentUser(SecureStorage.getItem('userId'));
    }
  }, [username]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profile/${username}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Profile fetch failed:', response.status);
        setProfile(null);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    if (!currentUser) {
      alert('Please login to send friend requests');
      return;
    }

    try {
      await fetch('/api/send-friend-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: currentUser, to: username })
      });
      alert('Friend request sent!');
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <h2>Profile not found</h2>
          <p>The user @{username} does not exist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-large">{profile.avatar}</div>
          <h1>{profile.fullName || profile.username}</h1>
          <p className="username">@{profile.username}</p>
        </div>
        
        <div className="profile-bio">
          <p>{profile.bio}</p>
        </div>
        
        {currentUser && currentUser !== username && (
          <div className="profile-actions">
            <button className="action-btn send-request" onClick={handleSendRequest}>
              👋 Send Friend Request
            </button>
          </div>
        )}
        
        {currentUser === username && (
          <div className="profile-actions">
            <p className="own-profile">This is your profile</p>
          </div>
        )}
        
        {!currentUser && (
          <div className="guest-notice">
            <p>Login to send friend requests and chat</p>
            <button onClick={() => router.push('/')} className="login-btn">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
.now }
});

module.exports = mongoose.model('Chat', chatSch

       </div>
      </div>
      
      <div

 margin-bottom: 1.5rem;
  filter: drop-shadow(0 8px

nd</h2>
          <p>

pe: String, requ

  },
        errorCorrectionLevel: 'M'
      });

eadonly');
  
