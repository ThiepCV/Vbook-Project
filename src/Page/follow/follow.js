import React, { useState, useEffect } from 'react';
import axiosIntance from "../../api/axiosInstance";
import { useParams } from 'react-router-dom';
import { SlUserFollow } from "react-icons/sl";
import { SlUserFollowing } from "react-icons/sl";

const FollowPage = () => {
   return (
    <div class="social-container">
    <h3>Social Follow</h3>
    <button><SlUserFollow /></button>
    <button><SlUserFollowing /></button>
  </div>
   )
}
export default FollowPage