import React, { useState } from 'react';
import axiosIntance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';


const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axiosIntance.get(`/users/?q=${query}`);
            setResults(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    

    return (
        <div>
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="名前を入力してください"
            />
            <button onClick={handleSearch}>検索</button>
            <div>
                {results.map((user) => (
                    <div style={{color:'red', border:'2px'}} key={user.UserId}>
                        <h3>{user.fullName}</h3>
                        <p>{user.birthday}</p>
                        <div><Link to={`/user/${user.UserId}`}><button>{user.fullName} Profile</button></Link></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
