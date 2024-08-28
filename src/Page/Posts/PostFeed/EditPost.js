import React, { useState } from 'react';
import axiosIntance from '../../../api/axiosInstance';

const EditPost = ({ PostId, initialContent, onEditComplete }) => {
    const [content, setContent] = useState(initialContent);
    const [error, setError] = useState('');

    const handleEdit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');

        try {
            await axiosIntance.put(
                `/update-post/${PostId}/`,
                { content },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            onEditComplete(); 
        } catch (error) {
            setError('An error occurred while updating the post.');
        }
    };

    return (
        <form onSubmit={handleEdit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Save</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default EditPost;
