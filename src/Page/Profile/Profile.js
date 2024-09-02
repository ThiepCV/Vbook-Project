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

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosIntance from "../../api/axiosInstance";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';

import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import FollowingList from '../Follow/FollowingList'
import FollowersList from "../Follow/FollowersList";
import "../Profile/style.css"
import PostFeed from "../Posts/PostFeed/PostFeed";


const Profile = () => {
    const [user, setUser] = useState(null);
    const { UserId } = useParams();
    const [isOwnProfile, setIsOwnProfile] = useState(false);

  

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

 

    

    if (!user) {
        return <div>Loading...</div>;
    }
  // Khởi tạo đối tượng Cloudinary với tên cloud của bạn
  const cld = new Cloudinary({ cloud: { cloudName: 'dn20txlip' } });

  // Tạo đối tượng hình ảnh với publicId của hình ảnh bạn muốn hiển thị
  const img = cld
      .image(user.profile_picture)  // Sử dụng publicId từ backend
      .format('auto')        // Tự động tối ưu hóa định dạng
      .quality('auto')       // Tự động tối ưu hóa chất lượng
      .resize(auto().gravity(autoGravity()).width(500).height(500)); // Thay đổi kích thước hình ảnh

  return (
    <div className="profile_page">
      <div className="profile">
            {/* <h1>Profile Page</h1> */}
            <div className="profile_img" >
                <div className="avatar">{user.profile_picture && (
                <img src={`${user.profile_picture}`} alt="Profile" width={100} />
            )}</div>
            <Link to={'/profile-upload'}>
            <button >
                Change Profile Picture
            </button>
            </Link>
            </div>
           <div className="info">
            <p>Username: {user.fullName}</p>
            <p>Email: {user.email}</p>
            <div><FollowingList/><FollowersList/></div>
            </div>
            
        </div>
        <PostFeed/>
    </div>
    );
};

export default Profile;