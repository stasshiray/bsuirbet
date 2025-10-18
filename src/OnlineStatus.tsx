import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import './OnlineStatus.css';

interface OnlineStatusProps {
  className?: string;
}

const OnlineStatus: React.FC<OnlineStatusProps> = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'online' | 'offline'>('online');
  const { t } = useLanguage();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNotificationType('online');
      setShowNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNotificationType('offline');
      setShowNotification(true);
      
      // Hide notification after 5 seconds for offline
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t]);

  // Don't render anything if online and no notification
  if (isOnline && !showNotification) {
    return null;
  }

  return (
    <div className={`online-status ${className}`}>
      {/* Status indicator - always visible when offline */}
      {!isOnline && (
        <div className="status-indicator offline">
          <div className="status-icon">📡</div>
          <span className="status-text">{t.offline || 'Offline'}</span>
        </div>
      )}

      {/* Notification - shows when status changes */}
      {showNotification && (
        <div className={`status-notification ${notificationType}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notificationType === 'online' ? '✅' : '❌'}
            </div>
            <div className="notification-text">
              <div className="notification-title">
                {notificationType === 'online' ? t.backOnline : t.goneOffline}
              </div>
              <div className="notification-subtitle">
                {notificationType === 'online' 
                  ? t.backOnlineDesc || 'Connection restored'
                  : t.offlineDesc || 'Check your internet connection'
                }
              </div>
            </div>
          </div>
          <button 
            className="notification-close"
            onClick={() => setShowNotification(false)}
            aria-label={t.close || 'Close'}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default OnlineStatus;
