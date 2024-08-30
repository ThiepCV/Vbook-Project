import React, { useState, useEffect } from 'react';
import axiosIntance from "../../api/axiosInstance";
import { useParams } from 'react-router-dom';
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";

const FollowPage = () => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [SelectedUserId, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [count, setCount] = useState(0);
    const { UserId } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const loggedInUserId = localStorage.getItem('UserId');
                setLoggedInUserId(loggedInUserId);
                const SelectedUserId = localStorage.getItem('SelectedUserId');
                setSelectedUserId(SelectedUserId)
                if (loggedInUserId === SelectedUserId ){
                    setIsFollowing(false);
                }
                // if (!UserId) return;

                // LẤY THÔNG TIN HỒ SƠ NGƯỜI DÙNG
                // const response = await axiosIntance.get(`follows/following/${UserId}/`);
                // setUser(response.data);
                // console.log("res",response.data)

                // KIỂM TRA XEM HỒ SƠ CÓ PHẢI CỦA NGƯỜI DÙNG ĐANG ĐĂNG NHẬP KHÔNG
                // setIsOwnProfile(UserId === loggedInUserId);

                // LẤY TRẠNG THÁI THEO DÕI CHỈ KHI NÀY KHÔNG PHẢI LÀ HỒ SƠ CỦA NGƯỜI DÙNG ĐANG ĐĂNG NHẬP
                // if (UserId === SelectedUserId) {
                //     const followingResponse = await axiosIntance.get(`follows/following/${loggedInUserId}/`);
                //     const followingUsers = followingResponse.data.following.map(user => user.UserId);
                //     setIsFollowing(followingUsers.includes(Number(UserId)));
                // }

            } catch (error) {
                console.error('Lỗi khi lấy thông tin hồ sơ hoặc trạng thái theo dõi', error);
            }
        };

        fetchProfile();
    }, [UserId]);

    const handleFollowToggle = async () => {
        if (!loggedInUserId) {
            console.error('Người dùng chưa đăng nhập');
            return;
        }

        try {
            if (!isFollowing) {
                await axiosIntance.post('follows/', { follower_id: SelectedUserId, followed_id: loggedInUserId });
                setIsFollowing(false);
                setCount(prevCount => prevCount + 1);
            } 
        } catch (error) {
            // console.error('Không thể thực hiện theo dõi/bỏ theo dõi người dùng:', error.response ? error.response.data : error.message);
        }
    };

    // KIỂM TRA XEM NGƯỜI DÙNG ĐANG ĐĂNG NHẬP CÓ CỐ GẮNG THEO DÕI CHÍNH HỌ KHÔNG
    const shouldShowFollowButton = loggedInUserId && loggedInUserId !== UserId;

    return (
        <div className="social-container">
            <h3>Theo dõi xã hội</h3>
            {shouldShowFollowButton && (
                <button className='follow_icon' onClick={handleFollowToggle}>
                    {isFollowing ? <SlUserFollowing /> : <SlUserFollow />} {/* SỬ DỤNG CÁC BIỂU TƯỢNG KHÁC NHAU CHO CÁC TRẠNG THÁI KHÁC NHAU */}
                </button>
            )}
            <h3>Số người theo dõi: {count}</h3>
        </div>
    );
};

export default FollowPage;