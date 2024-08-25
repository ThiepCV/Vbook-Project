import React, { useState, useEffect, memo } from 'react';
import { fetchUserProfile, createPost, likePost, commentOnPost, fetchUserPosts } from '../../api/axiosInstance';

const ProfilePage = ({ UserId }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('');
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState({});

    useEffect(() => {
        fetchUserProfile(UserId)
            .then(response => {
                setUser(response.data);
                return fetchUserPosts(UserId);
            })
            .then(response => setPosts(response.data))
            .catch(error => console.error('エラーが発生しました:', error));
    }, [UserId]);

    const handlePostSubmit = () => {
        createPost({ user_id: UserId, content: status })
            .then(response => {
                console.log('投稿が作成されました:', response.data);
                setStatus('');
                setPosts([response.data, ...posts]);
            })
            .catch(error => console.error('エラーが発生しました:', error));
    };

    const handleLike = (PostId) => {
        likePost(PostId)
            .then(response => {
                console.log('ポストがいいねされました:', response.data);
                setPosts(posts.map(post =>
                    post.id === PostId
                        ? { ...post, like_count: response.data.like_count }
                        : post
                ));
            })
            .catch(error => console.error('エラーが発生しました:', error));
    };

    const handleCommentSubmit = (PostId) => {
        commentOnPost(PostId, comment[PostId])
            .then(response => {
                console.log('コメントが追加されました:', response.data);
                setComment({ ...comment, [PostId]: '' });
                setPosts(posts.map(post =>
                    post.id === PostId
                        ? { ...post, comments: [...post.comments, response.data] }
                        : post
                ));
            })
            .catch(error => console.error('エラーが発生しました:', error));
    };

    if (!user) return <div>読み込み中...</div>;

    return (
        <div>
            <div className="user-info">
                <div className="avatar">
                    <img src={user.avatar || 'avatar.jpg'} alt="Avatar" />
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
                {posts.map(post => (
                    <div key={post.id} className="post-item">
                        <p>{post.content}</p>
                        <p>Posted at: {post.created_at}</p>
                        <button onClick={() => handleLike(post.id)}>
                        <i className="fas fa-paper-plane"></i> 
                            Like ({post.like_count})
                        </button>
                        <div>
                            <textarea
                                value={comment[post.id] || ''}
                                onChange={(e) => setComment({ ...comment, [post.id]: e.target.value })}
                                placeholder="Comment here..."
                            ></textarea>
                            <button onClick={() => handleCommentSubmit(post.id)}>
                            <i className="fas fa-paper-plane"></i> 
                                Comment
                            </button>
                            <div className="comments-list">
                                {post.comments.map(c => (
                                    <div key={c.id} className="comment-item">
                                        <p>{c.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(ProfilePage);
