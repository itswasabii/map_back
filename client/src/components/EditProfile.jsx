import React, { useState } from 'react';
import {
  Input,
  Textarea,
  Button,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../AuthContext';

const EditProfile = () => {
  const { userId } = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',
    occupation: '',
    qualifications: '',
    bio: '',
    location: '',
  });
  const [profilePic, setProfilePic] = useState(null);
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
      setProfilePic(file);
      setFilename(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    if (profilePic) {
      formDataObj.append('profilePic', profilePic);
    }

    const url = `/api/users/${userId}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: formDataObj,
        // No need to set content-type header when using FormData
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Clear the form data and filename after successful update
      setFormData({
        username: '',
        occupation: '',
        qualifications: '',
        bio: '',
        location: '',
      });
      setProfilePic(null);
      setFilename('');

    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'An error occurred',
        description:
          'Failed to update your profile. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg">
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
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            Profile Picture
          </Text>
          <div className="flex items-center gap-4">
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
              className="flex items-center justify-center h-10 px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
            >
              <AddIcon mr={2} />
              Choose File
            </label>
            <Text as="sup" color="gray.500">
              {filename}
            </Text>
          </div>
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
            className="input-field"
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
            className="input-field"
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
            className="input-field"
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
            className="input-field"
          />
        </div>

        <Button
          type="submit"
          mt={4}
          bg="blue.500"
          _hover={{ bg: 'blue.600' }}
          color="white"
          fontWeight="bold"
          px={4}
          py={2}
          rounded="md"
          w="100%"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
