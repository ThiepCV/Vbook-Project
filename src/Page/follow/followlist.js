import { useState, useEffect } from 'react';
import axiosIntance from "../../api/axiosInstance";
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { UserId } = useParams();
    const [user, setUser] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [followingCount, setFollowingCount] = useState(0); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const loggedInUserId = localStorage.getItem('UserId');
                const response = await axiosIntance.get(`user/${loggedInUserId}/`);
                setUser(response.data);
                setIsOwnProfile(UserId === loggedInUserId);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        fetchProfile();
    }, [UserId]);

    useEffect(() => {
        const fetchFollowingCount = async () => {
            try {
                const loggedInUserId = localStorage.getItem('UserId');
                const urlSearch = 'follows/following/' + loggedInUserId + '/';
                console.log("res",urlSearch,loggedInUserId);
                const response = await axiosIntance.get(urlSearch);
                console.log("res",response);
                const followingList = response.data.following;
                console.log("res",response.data.following)
                setFollowingCount(followingList.length);
            } catch (error) {
                console.error('Error fetching following count', error);
            }
        };

        fetchFollowingCount();
    }, [UserId]);

    return (
        <div>
            <h1>{user?.username}'s Profile</h1>
            <p>Following Count: {followingCount}</p>
            {/* Other profile details */}
        </div>
    );
};

export default UserProfile;
