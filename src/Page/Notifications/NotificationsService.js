import axiosIntance from "../../api/axiosInstance";


export const fetchNotifications = async () => {
    try {
        const response = await axiosIntance.get('/notifications/');
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const markNotificationsAsRead = async (notificationIds) => {
    try {
        await axiosIntance.post('/notifications/', { notification_ids: notificationIds });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        throw error;
    }
};
