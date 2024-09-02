import React, { useState } from 'react';
import axiosIntance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import "../Search/style.css";

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const cld = new Cloudinary({ cloud: { cloudName: 'dn20txlip' } });

    const handleUserClick = (UserId) => {
        localStorage.setItem('SelectedUserId', UserId);
    };
    const handleSearch = async () => {
        try {
            const response = await axiosIntance.get(`/users/?q=${query}`);
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching search results", error);
        }
        
    };


    // Nếu cần xử lý ảnh từ Cloudinary, hãy đảm bảo profile_picture là một publicId hợp lệ
    // const img = cld.image(user.profile_picture)
    //     .format('auto')
    //     .quality('auto')
    //     .resize(auto().gravity(autoGravity()).width(500).height(500));

    return (
        <div>
            <div className='search_body'>
                <div className="search_form">
                    <input 
                        type="text" 
                        className="search__input" 
                        placeholder="Type your text" 
                        value={query}  
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search__button">
                        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className='search_ls'>
                    {users.map((user) => (
                        <div style={{ color: 'red', border: '2px' }} key={user.UserId}>
                            
                            <div className="search_img">
                                <div className='img_layout'>
                                    <div className="search_avatar">
                                        {user.profile_picture && (
                                            <img src={`${user.profile_picture}`} alt="Profile" width={100} />
                                        )}
                                    </div>
                                </div>
                            
                                <div className='search_info'>
                                    <p>{user.fullName}</p>
                                    <p>{user.birthday}</p>
                                </div>
                            </div>
                            <div className='link_profile'>
                                <Link to={`/user/${user.UserId}`} onClick={() => handleUserClick(user.UserId)}>
                                    {user.fullName} Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
