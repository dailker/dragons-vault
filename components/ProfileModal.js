import React, { useState } from 'react';

export default function ProfileModal({ username, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: username,
    bio: "I am lazy to look my profile!",
    avatar: "🦕"
  });

  const handleSave = () => {
    // TODO: Save to backend
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Profile</h2>
          <div className="modal-actions">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                ✏️ Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">Save</button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
              </div>
            )}
            <button onClick={onClose} className="close-btn">✕</button>
          </div>
        </div>
        
        <div className="profile-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">{profile.avatar}</div>
            {isEditing && (
              <input
                type="text"
                value={profile.avatar}
                onChange={(e) => setProfile({...profile, avatar: e.target.value})}
                placeholder="Avatar emoji"
                maxLength="2"
              />
            )}
          </div>
          
          <div className="profile-field">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              />
            ) : (
              <div className="field-value">{profile.fullName}</div>
            )}
          </div>
          
          <div className="profile-field">
            <label>Username</label>
            <div className="field-value">@{username}</div>
          </div>
          
          <div className="profile-field">
            <label>Bio</label>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows="3"
              />
            ) : (
              <div className="field-value">{profile.bio}</div>
            )}
          </div>
          
          {!isEditing && (
            <div className="profile-actions">
              <p className="own-profile">This is your profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

            </div>
          </div>
        ))}
  

L=http://l

,
  coverageDirectory: 'coverage',
  verbose: true
}

ccept') {
        awa

ainer">
                <d

readyState) {
  

goose.connection.readyState) {
    a
