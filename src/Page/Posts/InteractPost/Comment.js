import React, { useState, useEffect } from 'react';
import axiosIntance from '../../../api/axiosInstance';
import { faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../InteractPost/style.css"

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentCount, setCommentCount] = useState(0);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        // Fetch the number of comments when the component mounts
        fetchCommentCount();
    }, [newComment]);

    const fetchCommentCount = async () => {
        try {
            const response = await axiosIntance.get(`/posts/${postId}/comment/`);
            setComments(response.data);
            setCommentCount(response.data.length); // Set the comment count
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await axiosIntance.post(`/posts/${postId}/comment/`, { content: newComment });
            setComments([...comments, response.data]);
            setNewComment('');
            console.log(response)
            console.log(comments)
            setCommentCount(commentCount + 1); // Increment the comment count
        } catch (error) {
            console.error(error);

        }
    };
    const handleProfileClick = (userId) => {
        // window.location.href = `/profile/${userId}`;
    };
    return (
        <div>
            <div className='comment'>
                
                <button onClick={() => setShowComments(!showComments)}>
                    {commentCount} <FontAwesomeIcon icon={faComment} />
                </button>
                <button onClick={() => setShowComments('dislike')}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>

                {showComments && (
                    <div>
                        {comments.map(comment => (
                            <div key={comment.CommentId}>
                                <p>{comment.content}</p>
                                {/* <span onClick={() => handleProfileClick(comment.userId)}>
                                 {comment.fullName}
            </span> */}
                            </div>
                        ))}
                        <div className='comment_content'>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleAddComment}>Add Comment</button>
                        </div>
                    </div>
                )}
            
        </div>

    );
};

export default Comments;
