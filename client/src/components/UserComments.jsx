// src/components/Comments.js
import React from 'react';
import { Box, Text, VStack, StackDivider } from '@chakra-ui/react';

const UserComments = () => {
  return (
    <VStack spacing={4} align="stretch" divider={<StackDivider borderColor="gray.200" />}>
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="lg" fontWeight="bold">Commenter 1</Text>
        <Text mt={2}>This is the first comment.</Text>
      </Box>
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="lg" fontWeight="bold">Commenter 2</Text>
        <Text mt={2}>This is the second comment.</Text>
      </Box>
      {/* Add more UserComments as needed */}
    </VStack>
  );
};

export default UserComments;
