import React from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input type="text" name="cohort_name" placeholder="Cohort Name" onChange={handleChange} required />
      <input type="text" name="created_by" placeholder="Created By" onChange={handleChange} required />
      <input type="text" name="type" placeholder="Type" onChange={handleChange} required />
      <input type="number" name="year_of_enrollment" placeholder="Year of Enrollment" onChange={handleChange} required />
      <input type="number" name="course_id" placeholder="Course ID" onChange={handleChange} required />
      <button type="submit">Create Cohort</button>
    </form>
  );
};

export default CreateCohort;
