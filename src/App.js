import React from 'react';
import UserList from './user';
import PostList from './postList';
import CreatePost from './createPost';

const App = () => {
  return (
    <div>
      <h1>Users</h1>
      <UserList />

      <h1>Posts</h1>
      <PostList />

      <h1>Create Post</h1>
      <CreatePost />
    </div>
  );
};

export default App;
