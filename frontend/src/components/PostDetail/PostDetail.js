import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './PostDetail.css';

function PostDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <Link to={`/edit/${post.id}`} className="edit-btn">Edit</Link>
        <Link to="/" className="back-btn">Back to List</Link>
      </div>
    </div>
  );
}

export default PostDetail;
