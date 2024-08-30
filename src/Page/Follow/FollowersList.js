// src/components/FollowersList.js
import React, { useState, useEffect } from 'react';
import axiosIntance from '../../api/axiosInstance';


const FollowersList = ({ userId }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        
        const response = await axiosIntance.get(`follows/followers/${userId}/`);
        setFollowers(response.data.followers);
        console.log("fer",followers)
      } catch (error) {
        console.error("Failed to fetch followers list:", error);
      }
    };

    fetchFollowers();
  }, [userId]);

  return (
    <div>
      <h2>Followers List</h2>
      <ul>
      {followers.map(follow => (
          <li key={follow.FollowId}>
            {/* <img src={follow.followed.profile_picture} alt={follow.followed.fullName} width="50" height="50" /> */}
            <span>{follow.followed_user.fullName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
