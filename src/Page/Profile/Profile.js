// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axiosIntance from "../../api/axiosInstance";
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';
// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const { UserId } = useParams();
//     const [isOwnProfile, setIsOwnProfile] = useState(false);

  

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const loggedInUserId = localStorage.getItem('UserId');
//                 const response = await axiosIntance.get(`user/${loggedInUserId}/`);
//                 setUser(response.data);
//                 setIsOwnProfile(UserId === loggedInUserId);
//             } catch (error) {
//                 console.error('Error fetching profile', error);
//             }
//         };

//         fetchProfile();
//     }, [UserId]);

 

    

//     if (!user) {
//         return <div>Loading...</div>;
//     }
//   // Khởi tạo đối tượng Cloudinary với tên cloud của bạn
//   const cld = new Cloudinary({ cloud: { cloudName: 'dn20txlip' } });

//   // Tạo đối tượng hình ảnh với publicId của hình ảnh bạn muốn hiển thị
//   const img = cld
//       .image(user.profile_picture)  // Sử dụng publicId từ backend
//       .format('auto')        // Tự động tối ưu hóa định dạng
//       .quality('auto')       // Tự động tối ưu hóa chất lượng
//       .resize(auto().gravity(autoGravity()).width(500).height(500)); // Thay đổi kích thước hình ảnh

//   return (
//       <div>
//             <h1>Profile Page</h1>
//             {user.profile_picture && (
//                 <img src={`${user.profile_picture}`} alt="Profile" width={100} />
//             )}
//             <Link to={'/profile-upload'}>
//             <button >
//                 Change Profile Picture
//             </button>
//             </Link>
           
//                       <p>Username: {user.username}</p>
//             <p>Email: {user.email}</p>
            
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosIntance from '../../api/axiosInstance';
import FollowButton from '../Follow/FollowButton/FollowButton';
import FollowersList from '../Follow/FollowersList';
import FollowingList from '../Follow/FollowingList';
import PostFeed from '../Posts/PostFeed/PostFeed';

const ProfilePage = ({ userId }) => {
    const { UserId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const[currentUserId, setCurrentUserId] = useState()
    useEffect(() => {
        const fetchUser = async () => {
            const currentUserIdFromStorage = localStorage.getItem('UserId');
            setCurrentUserId(currentUserIdFromStorage);
            try {
                console.log(UserId)
              
                const response = await axiosIntance.get(`/user/${UserId}/`);
                setUser(response.data);
                const postsResponse = await axiosIntance.get('posts/');
                console.log('posssss', postsResponse)
                // Filter posts for the specific user
                const userPosts = postsResponse.data.filter(post => Number(post.UserId) === Number(UserId));
                console.log('User posts:', userPosts);

                setPosts(userPosts);

            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUser();
    }, [UserId]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <img src={`${user.profile_picture}`} alt="Profile" width={100} />
            <h1>{user.fullName}</h1>
            <p>{user.birthday}</p>
            <p>{user.UserId}</p>
            {/* Nếu là chính người dùng thì không hiện nút follow/unfollow */}
            {UserId === currentUserId ? (
                <div>
                    <Link to="/user/update">
                    <button>Edit Profile</button>
                    </Link>
                    <Link to={'/profile-upload'}>
                      <button >
               Change Profile Picture
                     </button>
                          </Link>
                    <FollowersList userId={user.UserId} />
                    <FollowingList userId={user.UserId} />
                    
                </div>
            ) : (
                <FollowButton userId={UserId} currentUserId={currentUserId} />
            )}
            <PostFeed posts={posts} />
        </div>
    );
};

export default ProfilePage;
