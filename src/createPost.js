import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@material-ui/core';

const CreatePost = ({ updatePostList }) => {
  const [text, setText] = useState('');
  const [createdPost, setCreatedPost] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://dummyapi.io/data/v1/post/create',
        {
          text,
        },
        {
          headers: {
            'app-id': '6481b09629de07d3aff99ba2', 
            'Content-Type': 'application/json',
          },
        }
      );

      setText('');
      setCreatedPost(response.data);
      updatePostList(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleReturnClick = () => {
    setCreatedPost(null);
  };

  if (createdPost) {
    return (
      <div>
        <Typography variant="h6">Post Created:</Typography>
        <Typography>{createdPost.text}</Typography>
        <Button onClick={handleReturnClick} variant="contained">
          Return
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={text}
        onChange={event => setText(event.target.value)}
        label="Post Text"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Create Post
      </Button>
    </form>
  );
};

export default CreatePost;
