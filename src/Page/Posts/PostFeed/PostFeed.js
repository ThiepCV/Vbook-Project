import React, { useState, useEffect } from 'react';
import axiosIntance from '../../../api/axiosInstance';
import EditPost from './EditPost';

const PostFeed = ({ onPostDeleted, posts }) => {
 
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPostId, setEditingPostId] = useState(null); 

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem('access');
    if (!token) {
      setError('投稿を見るにはログインする必要があります。');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosIntance.get('posts/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setFetchedPosts(response.data);
    } catch (error) {
      setError('投稿の取得中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (PostId) => {
    const confirmDelete = window.confirm(
      "この投稿を削除してもよろしいですか？"
    );
    if (!confirmDelete) {
      return;
    }
    const token = localStorage.getItem('access');
    try {
      await axiosIntance.delete(`/delete-post/${PostId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      onPostDeleted();
      setFetchedPosts(fetchedPosts.filter((post) => post.PostId !== PostId));
    } catch (error) {
      setError('投稿の削除中にエラーが発生しました。');
    }
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <div key={String(post.PostId)} className="post">
        <p>
          <strong>{post.fullName}</strong>: {post.content}
        </p>
        <p>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </p>
        <button onClick={() => deletePost(post.PostId)}>削除</button>
        <button onClick={() => setEditingPostId(post.PostId)}>編集</button>
        {editingPostId === post.PostId && (
          <EditPost
            PostId={post.PostId}
            initialContent={post.content}
            onEditComplete={() => {
              setEditingPostId(null); 
              fetchPosts(); 
            }}
          />
        )}
      </div>
    ));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p>投稿を読み込み中...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>フィード</h2>
      {fetchedPosts.length > 0 ? renderPosts() : <p>表示する投稿がありません。</p>}
    </div>
  );
};

export default PostFeed;
