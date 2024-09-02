import { useState, useEffect } from 'react';
import axiosIntance from "../../api/axiosInstance";
import { useParams } from 'react-router-dom';

const Follower = () => {
    const { UserId } = useParams();
    const [user, setUser] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [followerCount, setFollowerCount] = useState(0); 

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
        const fetchFollowerCount = async () => {
            try {
                const loggedInUserId = localStorage.getItem('UserId');
                const FollowerSearch = 'follows/followers/' + loggedInUserId + '/';
                // const SelectedUserId = localStorage.getItem('SelectedUserId');
                // const SelectedSearch = 'follows/followers/' + SelectedUserId + '/';
                console.log("res",FollowerSearch,loggedInUserId);
                const response = await axiosIntance.get(FollowerSearch);
                // const responsed = await axiosIntance.get(SelectedSearch);
                console.log("res",response);
                const followerList = response.data.followers;
                console.log("res",followerList)
                // const followingLists = responsed.data.followers;
                // setFollowerCount(followingLists.length);
                setFollowerCount(followerList.length);
            } catch (error) {
                console.error('Error fetching follower count', error);
            }
        };

        fetchFollowerCount();
    }, [UserId]);

    return (
        <div>
            {/* <h1>{user?.username}'s Profile</h1> */}
            <p>follower Count: {followerCount}</p>
            {/* Other profile details */}
        </div>
    );
};

export default Follower;