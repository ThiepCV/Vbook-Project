import React, { useState, useEffect } from 'react';
import axiosIntance from '../../../api/axiosInstance';


const FollowButton = ({ userId, currentUserId }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                const response = await axiosIntance.get(`/user/${userId}/`);
                setIsFollowing(response.data.is_following);
            } catch (error) {
                console.error("Error fetching follow status", error);
            }
        };

        checkFollowStatus();
    }, [userId]);

    const handleFollow = async () => {
        try {
            await axiosIntance.post('/follows/', { follower_id: currentUserId, followed_id: userId });
            setIsFollowing(true);
        } catch (error) {
            console.error("Error following user", error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await axiosIntance.delete(`/follow/${userId}/`);
            setIsFollowing(false);
        } catch (error) {
            console.error("Error unfollowing user", error);
        }
    };

    return (
        <div>
            {isFollowing ? (
                <button>Đã theo dõi</button>
            ) : (
                <button onClick={handleFollow}>Theo dõi</button>
            )}
        </div>
    );
};

export default FollowButton;
