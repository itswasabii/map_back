import React, { useState } from 'react';
import { Input, Textarea, Button, Text, Flex, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../AuthContext';
import PropTypes from 'prop-types'


const EditProfile = ({nodeRef}) => {
  const { userId } = useAuth();
  
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',
    occupation: '',
    qualifications: '',
    bio: '',
    location: '',
    profilePic: null,
  });
  const [filename, setFilename] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePic: file,
      });
      setFilename(file.name);
    }
  };

  const url = `/api/users/${userId}`;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      console.log(data);

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'An error occurred',
        description: 'Failed to update your profile. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div ref={nodeRef} className="hidden p-6 mx-auto bg-white mt-8-">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            Username
          </Text>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            Profile Picture
          </Text>
          <div className="flex flex-col items-center">
            <Input
              id="profilePic"
              name="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="profilePic"
              className="flex items-center px-4 py-2 font-bold text-white h-[100px] rounded cursor-pointer w-[100%] border-dashed border-2 border-[#cae5ff] bg-[#EDF2F7]"
            >
              <Flex color={'#101f3c'} flexDir={'column'} gap={2} align={'center'} mx={'auto'}>
                <AddIcon alignSelf={'center'} />
                <Text>Choose file</Text>
              </Flex>
            </label>
          </div>
          <Text as={'sup'} color={'#101f3c'}>{filename}</Text>
        </div>
        <div className="mb-4">
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            Occupation
          </Text>
          <Input
            id="occupation"
            name="occupation"
            type="text"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Occupation"
            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            Qualifications
          </Text>
          <Textarea
            id="qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="Qualifications"
            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            resize="vertical"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            Bio
          </Text>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            resize="vertical"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            Location
          </Text>
          <Input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <Button
          type="submit"
          mt={4}
          bg="#101F3C"
          _hover={{ bg: '#101f3c' }}
          color="white"
          fontWeight="bold"
          px={4}
          py={2}
          rounded="md"
          w={'100%'}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};
EditProfile.propTypes = {
  nodeRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export default EditProfile;
