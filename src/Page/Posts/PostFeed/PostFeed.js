// import React, { useState, useEffect } from 'react';
// import axiosIntance from '../../../api/axiosInstance';
// import EditPost from './EditPost';
// import Post from '../InteractPost/Post';
// import Comments from '../InteractPost/Comment';

// const PostFeed = ({ onPostDeleted, posts }) => {
 
//   const [fetchedPosts, setFetchedPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [editingPostId, setEditingPostId] = useState(null); 

  
//   const fetchPosts = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('access');
//     if (!token) {
//       setError('投稿を見るにはログインする必要があります。');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axiosIntance.get('posts/', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setFetchedPosts(response.data);
//     } catch (error) {
//       setError('投稿の取得中にエラーが発生しました。');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deletePost = async (PostId) => {
//     const confirmDelete = window.confirm(
//       "この投稿を削除してもよろしいですか？"
//     );
//     if (!confirmDelete) {
//       return;
//     }
//     const token = localStorage.getItem('access');
//     try {
//       await axiosIntance.delete(`/delete-post/${PostId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       onPostDeleted();
//       setFetchedPosts(fetchedPosts.filter((post) => post.PostId !== PostId));
//     } catch (error) {
//       setError('投稿の削除中にエラーが発生しました。');
//     }
//   };

//   const renderPosts = () => {
//     return posts.map((post) => (
//       <div key={String(post.PostId)} className="post">
//         <p>
//           <strong>{post.fullName}</strong>: {post.content}
//         </p>
//         <p>
//           <small>{new Date(post.created_at).toLocaleString()}</small>
//         </p>
//         <button onClick={() => deletePost(post.PostId)}>削除</button>
//         <button onClick={() => setEditingPostId(post.PostId)}>編集</button>
//         {editingPostId === post.PostId && (
//           <EditPost
//             PostId={post.PostId}
//             initialContent={post.content}
//             onEditComplete={() => {
//               setEditingPostId(null); 
//               fetchPosts(); 
//             }}
//           />
//         )}
      
//                     <Post post={post} />
//                     <Comments postId={post.PostId} />
//       </div>
//     ));
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <p>投稿を読み込み中...</p>;
//   }

//   if (error) {
//     return <p style={{ color: 'red' }}>{error}</p>;
//   }

//   return (
//     <div>
//       <h2>フィード</h2>
//       {fetchedPosts.length > 0 ? renderPosts() : <p>表示する投稿がありません。</p>}
//     </div>
//   );
// };

// export default PostFeed;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance'; 
import EditPost from './EditPost';
import Post from '../InteractPost/Post';
import Comments from '../InteractPost/Comment';
import "../PostFeed/style.css"

const PostFeed = ({ onPostDeleted, posts }) => {
  const currentUserId = localStorage.getItem('UserId');
  const [fetchedPosts, setFetchedPosts] = useState(posts || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    if (!posts) {
      fetchPosts();
    } else {
      setFetchedPosts(posts);
      setLoading(false);
    }
  }, [posts]);

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem('access');
    if (!token) {
      setError('投稿を見るにはログインする必要があります。');
      setLoading(false);  
      return;
    }

    try {
      const response = await axiosInstance.get('posts/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        
      });
      setFetchedPosts(response.data);
      console.log("res",response.data)
      
    } catch (error) {
      setError('投稿の取得中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm("この投稿を削除してもよろしいですか？");
    if (!confirmDelete) {
      return;
    }
    const token = localStorage.getItem('access');
    try {
      await axiosInstance.delete(`/delete-post/${postId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      onPostDeleted();
      setFetchedPosts(fetchedPosts.filter((post) => post.PostId !== postId));
    } catch (error) {
      setError('投稿の削除中にエラーが発生しました。');
    }
  };

  const renderPosts = () => {
    
    
    return fetchedPosts.map((post) => (
      <div className="post"> 
      <div key={String(post.PostId)} className='post_ls' >
        <h1>
          <strong>{post.fullName || post.user}</strong>
        </h1>
        <p> {post.content}</p>
        <p>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </p>
        {post.UserId === currentUserId && (
          
        <>
          <button onClick={() => deletePost(post.PostId)}>削除</button>
          <button onClick={() => setEditingPostId(post.PostId)}>編集</button>
        </>
      )}
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
        <div className='likeComment'>
        <Post post={post} />
        {/* <Comments postId={post.PostId} /> */}
        
        </div>
        

        
      </div>
      </div>
    ));
  };

  if (loading) {
    return <p>投稿を読み込み中...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className='post_ls'>
      {/* <h2>フィード</h2> */}
      {fetchedPosts.length > 0 ? renderPosts() : <p>表示する投稿がありません。</p>}
    </div>
  );
};

export default PostFeed;
