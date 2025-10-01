const PreferencesTab = ({ user }) => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    videoQuality: 'auto',
    downloadQuality: 'high',
    autoPlay: true,
    keyboardShortcuts: true
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePreferences = () => {
    setTimeout(() => {
      alert('Preferences saved successfully!');
    }, 500);
  };

  return (
    <div className="tab-content">
      <h2>Preferences</h2>
      <p className="tab-description">Customize your learning experience</p>

      <div className="preference-sections">
        <div className="preference-section">
          <h3>Appearance</h3>
          <div className="preference-options">
            <div className="preference-option">
              <label>Theme</label>
              <select
                value={preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            <div className="preference-option">
              <label>Language</label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>
        </div>

        <div className="preference-section">
          <h3>Video & Media</h3>
          <div className="preference-options">
            <div className="preference-option">
              <label>Video Quality</label>
              <select
                value={preferences.videoQuality}
                onChange={(e) => handlePreferenceChange('videoQuality', e.target.value)}
              >
                <option value="auto">Auto</option>
                <option value="low">Low (360p)</option>
                <option value="medium">Medium (720p)</option>
                <option value="high">High (1080p)</option>
                <option value="ultra">Ultra (4K)</option>
              </select>
            </div>

            <div className="preference-option">
              <label>Download Quality</label>
              <select
                value={preferences.downloadQuality}
                onChange={(e) => handlePreferenceChange('downloadQuality', e.target.value)}
              >
                <option value="low">Low (Smaller size)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Best quality)</option>
              </select>
            </div>

            <label className="preference-toggle">
              <input
                type="checkbox"
                checked={preferences.autoPlay}
                onChange={(e) => handlePreferenceChange('autoPlay', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Auto-play next lesson</span>
            </label>
          </div>
        </div>

        <div className="preference-section">
          <h3>Accessibility</h3>
          <div className="preference-options">
            <label className="preference-toggle">
              <input
                type="checkbox"
                checked={preferences.keyboardShortcuts}
                onChange={(e) => handlePreferenceChange('keyboardShortcuts', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Enable keyboard shortcuts</span>
            </label>

            <div className="preference-option">
              <label>Closed Captions</label>
              <select defaultValue="auto">
                <option value="auto">Auto-generated</option>
                <option value="human">Human-generated</option>
                <option value="off">Off</option>
              </select>
            </div>

            <div className="preference-option">
              <label>Playback Speed</label>
              <select defaultValue="1">
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x (Normal)</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-primary" onClick={savePreferences}>
          Save Preferences
        </button>
        <button className="btn-outline">
          Reset to Defaults
        </button>
      </div>

      <style jsx>{`
        .preference-sections {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .preference-section {
          padding: 1.5rem;
          border: 1px solid #eee;
          border-radius: 8px;
        }
        
        .preference-section h3 {
          margin: 0 0 1rem;
          color: #1a1a1a;
          font-size: 1.2rem;
        }
        
        .preference-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .preference-option {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .preference-option label {
          font-weight: 500;
          color: #333;
        }
        
        .preference-option select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          max-width: 200px;
        }
        
        .preference-toggle {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
        }
        
        .preference-toggle input {
          display: none;
        }
        
        .toggle-slider {
          width: 50px;
          height: 24px;
          background: #ddd;
          border-radius: 12px;
          position: relative;
          transition: background 0.2s ease;
        }
        
        .toggle-slider::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: transform 0.2s ease;
        }
        
        .preference-toggle input:checked + .toggle-slider {
          background: #6E8AFA;
        }
        
        .preference-toggle input:checked + .toggle-slider::before {
          transform: translateX(26px);
        }
        
        .toggle-label {
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .preference-option select {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};