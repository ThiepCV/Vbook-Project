import React, { useState, useEffect } from 'react';
import axiosIntance from "../../api/axiosInstance";
import { Link } from 'react-router-dom';

const SearchPage = () => {
    const [searchItem, setSearchItem] = useState('');
    const [users, setUsers] = useState([]);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosIntance.get('search/', {
                    params: {
                        q: searchItem,
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        if (searchItem) {
            fetchUsers();
        }
    }, [searchItem]);

    const handleUserClick = (UserId) => {
        localStorage.setItem('SelectedUserId', UserId);
    };

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
                    <li key={user.UserId}>
                        <Link to={`/user/${user.UserId}`} onClick={() => handleUserClick(user.UserId)}>
                            {user.fullName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
