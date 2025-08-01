import React from 'react';
import { ThemeManager } from '../lib/theme';

export default function SettingsModal({ onClose }) {
  const themes = [
    { id: 'dark', name: 'Dark', preview: '#1a1a1a' },
    { id: 'light', name: 'Light', preview: '#ffffff' },
    { id: 'blue', name: 'Ocean Blue', preview: '#3498db' },
    { id: 'neon', name: 'Neon', preview: '#ff0080' }
  ];

  const currentTheme = ThemeManager.getCurrentTheme();

  const handleThemeChange = (themeId) => {
    ThemeManager.setTheme(themeId);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚙️ Settings</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        
        <div className="settings-content">
          <div className="settings-section">
            <h3>🎨 Theme</h3>
            <div className="theme-grid">
              {themes.map(theme => (
                <div 
                  key={theme.id}
                  className={`theme-card ${currentTheme === theme.id ? 'selected' : ''}`}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  <div 
                    className="theme-preview" 
                    style={{ background: theme.preview }}
                  ></div>
                  <span className="theme-name">{theme.name}</span>
                  {currentTheme === theme.id && <div className="selected-indicator">✓</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
10.4.tgz",

className="profile-avatar-large">{profile

endRequestCount();
  }, []);

  const fetchFriend

 (req.method =

   </div>
    </div>
  );
}
      </div>
   

er(req, res) {
  if (!mon

retKey).
