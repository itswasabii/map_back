// src/components/Posts.js
import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, StackDivider } from '@chakra-ui/react';
import { useAuth } from '../AuthContext';

const UserPosts = () => {
  const { userId } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.posts); // Assuming your API returns an array of posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <VStack spacing={4} align="stretch" divider={<StackDivider borderColor="gray.200" />}>
      {posts.map((post) => (
        <Box key={post.id} p={4} shadow="md" borderWidth="1px">
          <Text fontSize="lg" fontWeight="bold">{post.title}</Text>
          <Text mt={2}>{post.content}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default UserPosts;
