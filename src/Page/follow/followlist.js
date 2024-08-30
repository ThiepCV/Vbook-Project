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
    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const loggedInUserId = localStorage.getItem('SelectedUserId');
    //             console.log(loggedInUserId)
    //             const response = await axiosIntance.get(`user/${loggedInUserId}/`);
    //             setUser(response.data);
    //             setIsOwnProfile(UserId === loggedInUserId);
    //         } catch (error) {
    //             console.error('Error fetching profile', error);
    //         }
    //     };

    //     fetchProfile();
    // }, [UserId]); 

    useEffect(() => {
        const fetchFollowingCount = async () => {
            try {
                const loggedInUserId = localStorage.getItem('UserId');
                // const SelectedUserId = localStorage.getItem('SelectedUserId');
                const urlSearch = 'follows/following/' + loggedInUserId + '/';
                // const SelectedSearch = 'follows/following/' + SelectedUserId + '/';
                console.log("res",urlSearch,loggedInUserId);
                const response = await axiosIntance.get(urlSearch);
                // const responsed = await axiosIntance.get(SelectedSearch);
                console.log("res",response);
                const followingList = response.data.following;
                // const followingLists = responsed.data.following;
                console.log("res",response.data.following)
                setFollowingCount(followingList.length);
                // setFollowingCount(followingLists.length);
            } catch (error) {
                console.error('Error fetching following count', error);
            }
        };
        fetchFollowingCount();
    }, [UserId]);



    return (
        <div>
            <p>Following Count: {followingCount}</p>
            {/* Other profile details */}
        </div>
    );
};

export default UserProfile;
