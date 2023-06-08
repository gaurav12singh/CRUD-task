import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, TextField } from '@material-ui/core';
import { Delete, Edit, Check } from '@material-ui/icons';
import './App.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://dummyapi.io/data/v1/post', {
        headers: {
          'app-id': '6481b09629de07d3aff99ba2', 
        },
      });
      setPosts(response.data.data);
    };

    fetchPosts();
  }, []);

  const deletePost = async (postId) => {
    try {
      await axios.delete(`https://dummyapi.io/data/v1/post/${postId}`, {
        headers: {
          'app-id': '6481b09629de07d3aff99ba2', 
        },
      });
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (postId, newText) => {
    try {
      const response = await axios.put(
        `https://dummyapi.io/data/v1/post/${postId}`,
        { text: newText },
        {
          headers: {
            'app-id': '6481b09629de07d3aff99ba2', 
          },
        }
      );
      const updatedPost = response.data;
      setPosts(prevPosts =>
        prevPosts.map(post => (post.id === postId ? updatedPost : post))
      );
      cancelEdit();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (postId, text) => {
    setEditingPostId(postId);
    setUpdatedText(text);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setUpdatedText('');
  };

  return (
    <List className="post-list">
      {posts.map(post => (
        <ListItem key={post.id} className="post-item">
          {editingPostId === post.id ? (
            <>
              <TextField
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
              />
              <IconButton
                edge="end"
                aria-label="check"
                onClick={() => updatePost(post.id, updatedText)}
              >
                <Check />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="cancel"
                onClick={cancelEdit}
              >
                <Delete />
              </IconButton>
            </>
          ) : (
            <>
              <ListItemText primary={post.text} className="post-text" />
              <ListItemText secondary={post.owner.firstName} className="post-owner" />
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => startEdit(post.id, post.text)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deletePost(post.id)}
              >
                <Delete />
              </IconButton>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
