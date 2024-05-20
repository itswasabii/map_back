// src/components/Posts.js
import React from 'react';
import { Box, Text, VStack, StackDivider } from '@chakra-ui/react';

const UserPosts = () => {
  return (
    <VStack spacing={4} align="stretch" divider={<StackDivider borderColor="gray.200" />}>
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="lg" fontWeight="bold">Post Title 1</Text>
        <Text mt={2}>This is the content of the first post.</Text>
      </Box>
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="lg" fontWeight="bold">Post Title 2</Text>
        <Text mt={2}>This is the content of the second post.</Text>
      </Box>
      {/* Add more UserPosts as needed */}
    </VStack>
  );
};

export default UserPosts;
