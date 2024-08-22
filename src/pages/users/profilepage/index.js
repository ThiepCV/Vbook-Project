// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { memo } from 'react';
import { fetchUserProfile, createPost } from '../../../api/axiosInstance';
import './style.scss';

const ProfilePage = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
  
        fetchUserProfile(userId)
            .then(response => setUser(response.data))
            .catch(error => console.error('ユーザープロフィールの取得中にエラーが発生しました:', error));
    }, [userId]);

    const handlePostSubmit = () => {
        createPost({ user_id: userId, content: status })
            .then(response => {
                console.log('投稿が作成されました:', response.data);
                setStatus(''); 
            })
            .catch(error => console.error('投稿の作成中にエラーが発生しました:', error));
    };

    if (!user) return <div>読み込み中...</div>;

    return (
        <div>
            <div className="user-info">
                <div className="avatar">
                    <img src="avatar.jpg" alt="Avatar" />
                </div>
                <div className="user-details">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>フォロー中: {user.following_count}</p>
                </div>
            </div>

            <div className="status-form">
                <textarea
                    placeholder="ステータスを共有してください"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                ></textarea>
                <div className="actions">
                    <button onClick={handlePostSubmit}>
                        <i className="fas fa-paper-plane"></i> 投稿
                    </button>
                </div>
            </div>

            <div className="status-list">
                {/* ユーザーの投稿をここに表示 */}
            </div>
        </div>
    );
};

export default memo(ProfilePage);
