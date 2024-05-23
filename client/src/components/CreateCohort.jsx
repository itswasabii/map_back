import React from 'react';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import AdminSidebar from './AdminSidebar';

const API_URL = 'http://localhost:5555';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const CreateCohort = () => {
  const [formData, setFormData] = React.useState({
    cohort_name: '',
    created_by: '',
    type: '',
    year_of_enrollment: '',
    course_id: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/cohorts', formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <AdminSidebar />
      <Box p={8} className="relative scrollbar-f w-[calc(100vw-250px)] ml-[250px] overflow-y-scroll">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="cohort_name">Cohort Name</FormLabel>
            <Input
              type="text"
              name="cohort_name"
              id="cohort_name"
              placeholder="Cohort Name"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="created_by">Created By</FormLabel>
            <Input
              type="text"
              name="created_by"
              id="created_by"
              placeholder="Created By"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Input type="text" name="type" id="type" placeholder="Type" onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="year_of_enrollment">Year of Enrollment</FormLabel>
            <Input
              type="number"
              name="year_of_enrollment"
              id="year_of_enrollment"
              placeholder="Year of Enrollment"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="course_id">Course ID</FormLabel>
            <Input type="number" name="course_id" id="course_id" placeholder="Course ID" onChange={handleChange} />
          </FormControl>
          <Button type="submit" mt={4}>
            Create Cohort
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CreateCohort;
