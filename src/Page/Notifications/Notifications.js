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
            <h2>Thông báo</h2>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className='Notifications_botton'>
                    {notifications.map(notification => (
                        <div key={notification.id} className={notification.is_read ? 'notification-read' : 'notification-unread'}>
                            <p>{notification.message}</p>
                        </div>
                    ))}
                    <button onClick={handleMarkAsRead}>Đánh dấu tất cả đã đọc</button>
                </div>
            )}
        </div>
    );
};

export default Notifications;
