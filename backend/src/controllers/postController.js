const Post = require('../models/Post');

exports.getAllPosts = (req, res) => {
  Post.getAll((err, posts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(posts);
  });
};

exports.getPostById = (req, res) => {
  const id = req.params.id;
  Post.getById(id, (err, post) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  });
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  Post.create(title, content, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, message: 'Post created successfully' });
  });
};

exports.updatePost = (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  Post.update(id, title, content, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Post updated successfully' });
  });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Post deleted successfully' });
  });
};
