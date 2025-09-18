import React from 'react';

export default function SystemMessage({ message }) {
  return (
    <div className="system-message">
      <span className="system-message-text">{message}</span>
    </div>
  );
}