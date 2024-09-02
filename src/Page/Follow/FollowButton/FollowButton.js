import React, { useState, useEffect } from 'react';
import axiosIntance from "../../api/axiosInstance";
import { FaUserPlus } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";


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
                <button><FaUserPlus /></button>
            ) : (
                <button onClick={handleFollow}><FaUserCheck /></button>
            )}
        </div>
    );
};

export default FollowButton;
