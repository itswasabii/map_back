import React from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import AdminSidebar from './AdminSidebar';

const API_URL = 'http://localhost:5555';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ViewAllUsers = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        alert(error.response.data.error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <AdminSidebar/>
      <Box p={8} className="relative scrollbar-f w-[calc(100vw-250px)] ml-[250px] overflow-y-scroll">
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </Box>
    </div>
    
  );
};

export default ViewAllUsers;
