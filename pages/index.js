import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import AuthForm from '../components/AuthForm';
import { SecureStorage } from '../lib/storage';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUserId = SecureStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    setUserId(username);
    SecureStorage.setItem('userId', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    SecureStorage.removeItem('userId');
    setUserId('');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return <MainLayout username={userId} onLogout={handleLogout} />;
}