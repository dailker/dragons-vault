import React, { useState, useEffect } from 'react';

export default function Error({ statusCode, hasGetInitialPropsRun, err }) {
  const [envError, setEnvError] = useState(null);

  useEffect(() => {
    // Check if this is an environment configuration error
    if (typeof window !== 'undefined' && window.__ENV_ERROR__) {
      setEnvError(window.__ENV_ERROR__);
    }
    
    // Check health status periodically
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health');
        const status = await response.json();
        if (!status.isValid) {
          setEnvError(status);
        }
      } catch (error) {
        console.error('Health check failed:', error);
      }
    };
    
    const interval = setInterval(checkHealth, 10 * 60 * 1000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  if (envError) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '600px',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ff6b6b' }}>
            🔧 Configuration Error
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Please set environment variables correctly
          </p>
          
          <div style={{
            background: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>Issues Found:</h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {envError.errors?.map((error, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{error}</li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '1.5rem',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Setup Steps:</h3>
            <ol style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Create <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code> file in project root</li>
              <li>Add: <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>MONGO_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/dragonsVault</code></li>
              <li>Get MongoDB URI from <a href="https://cloud.mongodb.com" target="_blank" style={{ color: '#4ecdc4' }}>MongoDB Atlas</a></li>
              <li>Restart the development server</li>
            </ol>
            
            {envError.lastCheck && (
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                Last checked: {new Date(envError.lastCheck).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a1a',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>{statusCode || 'Error'}</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>
          {statusCode === 404 ? 'Page not found' : 'An error occurred'}
        </p>
      </div>
    </div>
  );
}