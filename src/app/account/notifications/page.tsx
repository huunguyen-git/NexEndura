'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getInboxMessagesAction, markMessageReadAction } from '@/app/actions/notifications';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInboxMessagesAction().then(data => {
      setNotifications(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const markAsRead = async (id: string) => {
    // Optimistic update
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
    // Server action
    await markMessageReadAction(id).catch(console.error);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Notification Center</h1>
      
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          Loading notifications...
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-5 rounded-2xl border transition-all ${
              notif.isRead 
                ? 'border-gray-100 bg-white shadow-sm' 
                : 'border-blue-100 bg-blue-50 shadow-md'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className={`font-bold mb-1 ${notif.isRead ? 'text-gray-900' : 'text-blue-900'}`}>
                  {notif.title}
                </h3>
                <p className={`text-sm mb-3 ${notif.isRead ? 'text-gray-600' : 'text-blue-800'}`}>
                  {notif.message}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(notif.date).toLocaleDateString()}
                  </span>
                  {notif.link && (
                    <Link href={notif.link} className="text-xs font-bold text-blue-600 hover:underline">
                      View Details
                    </Link>
                  )}
                </div>
              </div>
              
              {!notif.isRead && (
                <button 
                  onClick={() => markAsRead(notif.id)}
                  className="shrink-0 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            You have no notifications.
          </div>
        )}
        </div>
      )}
    </div>
  );
}
