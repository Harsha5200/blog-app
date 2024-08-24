import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="post-list">
      <h1>Blog Posts</h1>
      <Link to="/new" className="new-post-btn">New Post</Link>
      {posts.map(post => (
        <div key={post.id} className="post-item">
          <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
          <p>{post.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
