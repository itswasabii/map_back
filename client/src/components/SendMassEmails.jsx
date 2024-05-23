import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';

const API_URL = '/api';

const SendMassEmails = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: formData.subject,
          message: formData.message,
          recipients: selectedUsers,
        }),
      });
      alert('Mass email sent successfully.');
    } catch (error) {
      console.error('Error sending mass email:', error);
      alert('Error sending mass email. Please try again later.');
    }
  };

  return (
    <div>
      <AdminSidebar />
      <Box p={8} className="relative scrollbar-f w-[calc(100vw-250px)] ml-[250px] overflow-y-scroll">
      <form onSubmit={handleSubmit}>
        <input type="text" name="subject" placeholder="Subject" onChange={handleChange} required />
        <textarea name="message" placeholder="Message" onChange={handleChange} required />
        <h3>Select users to send email:</h3>
        {users.map((user) => (
          <div key={user.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
              {user.username} - {user.email}
            </label>
          </div>
        ))}
        <button type="submit">Send Emails</button>
      </form>
    </Box>
    </div>
  );
};

export default SendMassEmails;
