import React, { useState, useEffect } from 'react';
import { fetchNotifications, markNotificationsAsRead } from './NotificationsService';
import "../Notifications/style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (error) {
                console.error('Error loading notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    const handleMarkAsRead = async () => {
        const unreadNotifications = notifications.filter(n => !n.is_read);
        const idsToMark = unreadNotifications.map(n => n.id);
        try {
            await markNotificationsAsRead(idsToMark);
            setNotifications(notifications.map(n => ({ ...n, is_read: true })));
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    return (
        <div className='Notifications'>
            <h2>通知</h2>
            <div className='button_NO'>
            <button onClick={handleMarkAsRead}>ACTIVITY</button>
            <button onClick={handleMarkAsRead}>NOTIFICATION</button>
            </div>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className='Notifications_botton'>
                    {notifications.map(notification => (
                        <div key={notification.id} className={notification.is_read ? 'notification-read' : 'notification-unread'}>
                            <div className='notification_rp'>
                            <p >{notification.message}</p>
                            <hr/>
                            </div>
                       
                        </div>
                        
                    ))}
                    
                    <div className='pr_button'><button  onClick={handleMarkAsRead}>全て読んだ</button></div>
                    
                </div>
                
            )}
        </div>
    );
};

export default Notifications;
