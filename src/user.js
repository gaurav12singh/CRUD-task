import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListItem, ListItemText } from '@material-ui/core';
import './App.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://dummyapi.io/data/v1/user', {
        headers: {
          'app-id': '6481b09629de07d3aff99ba2', 
        },
      });
      setUsers(response.data.data);
    };

    fetchUsers();
  }, []);

  return (
    <ul className="user-list">
      {users.map(user => (
        <ListItem key={user.id} className="user-item">
          <img src={user.picture} alt={user.firstName} className="avatar" />
          <div className="user-details">
            <ListItemText primary={user.firstName} className="user-name" />
            <ListItemText secondary={user.email} className="user-email" />
          </div>
        </ListItem>
      ))}
    </ul>
  );
};

export default UserList;
