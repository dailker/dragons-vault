import React, { useEffect, useState } from 'react';
import { ThemeManager } from '../lib/theme';
import { EnvChecker } from '../lib/env-check';
import '../styles/themes.css';
import '../styles/auth.css';
import '../styles/layout.css';

export default function App({ Component, pageProps, envCheck }) {
  const [envError, setEnvError] = useState(null);

  useEffect(() => {
    // Initialize theme
    ThemeManager.init();
    
    // Check environment
    if (envCheck && !envCheck.isValid) {
      setEnvError(envCheck);
      if (typeof window !== 'undefined') {
        window.__ENV_ERROR__ = envCheck;
      }
    }
    
    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed'));
    }
  }, [envCheck]);

  if (envError) {
    return <Component {...pageProps} />; // Will show error page
  }

  return <Component {...pageProps} />;
}

App.getInitialProps = async (appContext) => {
  let envCheck = { isValid: true };
  
  if (typeof window === 'undefined') {
    try {
      envCheck = await EnvChecker.checkEnvironment();
      EnvChecker.startPeriodicCheck();
    } catch (error) {
      envCheck = {
        isValid: false,
        errors: ['Environment check failed: ' + error.message],
        lastCheck: new Date().toISOString()
      };
    }
  }

  return { envCheck };
};