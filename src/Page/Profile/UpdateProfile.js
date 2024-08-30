import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import axiosIntance from '../../api/axiosInstance';

const UpdateProfile = () => {
    const [user, setUser] = useState({
        fullName: '',
        bio: '',
        // "Personal-Link":'',

    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const UserId = localStorage.getItem('UserId'); // Lấy UserId từ localStorage

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosIntance.get(`/user/${UserId}/`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [UserId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosIntance.put(`/user/${UserId}/update/`, user, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'Content-Type': 'application/json'
                }
            });
            navigate(`/user/${UserId}`); // Điều hướng đến trang hồ sơ sau khi cập nhật thành công
        } catch (err) {
            setError('Error updating profile');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={user.fullName || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Bio:
                    <input
                        type="text"
                        name="bio"
                        value={user.bio || ''}
                        onChange={handleChange}
                    />
                </label>
                {/* <label>
                    Personal-link:
                    <input
                        type="text"
                        name="Personallink"
                        value={user.personal-Link || ''}
                        onChange={handleChange}
                    />
                </label> */}
                {/* Add other fields as needed */}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
