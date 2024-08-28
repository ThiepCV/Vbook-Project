import React, { useState, useEffect } from 'react';
import axiosIntance from "../../api/axiosInstance";
import { useParams } from 'react-router-dom';

const SearchPage = () => {
    const [searchItem, setSearchItem] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const { UserId } = useParams();

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
    };

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
        const fetchUsers = async () => {
            try {
                const response = await axiosIntance.get(`search/`, {
                    params: {
                        q: searchItem
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, [searchItem]);

    return (
        <div>
            <input
                type="text"
                value={searchItem}
                onChange={handleInputChange}
                placeholder="Search"
            />
            <ul>
                {users.map(user => (
                    <li key={user.UserId}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
