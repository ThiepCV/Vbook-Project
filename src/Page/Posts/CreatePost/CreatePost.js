import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosIntance from '../../../api/axiosInstance';

const CreatePost = ({ onPostCreated, posts }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access'); 
        const user_id = localStorage.getItem('UserId');
        console.log(token, user_id)
        if (!token || !user_id) {
            setError('投稿を作成するにはログインする必要があります。');
            return;
        }

        try {
            const response = await axiosIntance.post(
                '/post/', 
                { content, UserId: user_id },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                onPostCreated(response.data);
                setContent('');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'エラーが発生しました。');
            } else {
                setError('エラーが発生しました。');
            }
        }
    };

    return (
        <div>
            <h2>新しい投稿を作成</h2>
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="ここに投稿を書いてください..."
                    required
                />
                <button type="submit">投稿</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreatePost;
