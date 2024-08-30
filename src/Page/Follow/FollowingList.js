// src/components/FollowingList.js
import React, { useState, useEffect } from 'react';
import axiosIntance from '../../api/axiosInstance';


const FollowingList = ({ userId }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axiosIntance.get(`follows/following/${userId}/`);
        setFollowing(response.data.following);
        console.log("foling",following)
      } catch (error) {
        console.error("Failed to fetch following list:", error);
      }
    };

    fetchFollowing();
  }, [userId]);

  return (
    <div>
      <h2>Following List</h2>
      <ul>
      {following.map(follow => (
          <li key={follow.FollowId}>
            {/* <img src={follow.followed.profile_picture} alt={follow.followed.fullName} width="50" height="50" /> */}
            <span>{follow.followed.fullName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
