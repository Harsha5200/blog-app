const db = require('../config/database');

class Post {
  static getAll(callback) {
    db.all('SELECT * FROM posts ORDER BY created_at DESC', callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM posts WHERE id = ?', [id], callback);
  }

  static create(title, content, callback) {
    db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function(err) {
      callback(err, this.lastID);
    });
  }

  static update(id, title, content, callback) {
    db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], callback);
  }

  static delete(id, callback) {
    db.run('DELETE FROM posts WHERE id = ?', [id], callback);
  }
}

module.exports = Post;
