import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// API setup
const API_URL = 'http://localhost:5555';  

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Component to create a cohort
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

// Component to create a post
const CreatePost = () => {
  const [formData, setFormData] = React.useState({
    user_id: '',
    cohort_id: '',
    category: '',
    content: '',
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
      const response = await api.post('/posts', formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user_id" placeholder="User ID" onChange={handleChange} required />
      <input type="text" name="cohort_id" placeholder="Cohort ID" onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
      <textarea name="content" placeholder="Content" onChange={handleChange} required />
      <button type="submit">Create Post</button>
    </form>
  );
};

// Component to view all users
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
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.user_id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

// Component to send mass emails
const SendMassEmails = () => {
  const [formData, setFormData] = React.useState({
    subject: '',
    message: '',
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
      const response = await api.post('/send-mass-emails', formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} required />
      <textarea name="message" placeholder="Message" onChange={handleChange} required />
      <button type="submit">Send Emails</button>
    </form>
  );
};

// Component to create a fundraiser
const CreateFundraiser = () => {
  const [formData, setFormData] = React.useState({
    user_id: '',
    title: '',
    description: '',
    goal_amount: '',
    end_date: '',
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
      const response = await api.post('/fundraisers', formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user_id" placeholder="User ID" onChange={handleChange} required />
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="goal_amount" placeholder="Goal Amount" onChange={handleChange} required />
      <input type="date" name="end_date" onChange={handleChange} required />
      <button type="submit">Create Fundraiser</button>
    </form>
  );
};

// Main admin component
const Admin = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/create-cohort">Create Cohort</Link></li>
            <li><Link to="/create-post">Create Post</Link></li>
            <li><Link to="/view-all-users">View All Users</Link></li>
            <li><Link to="/send-mass-emails">Send Mass Emails</Link></li>
            <li><Link to="/create-fundraiser">Create Fundraiser</Link></li>
          </ul>
        </nav>
        <Route path="/create-cohort" component={CreateCohort} />
        <Route path="/create-post" component={CreatePost} />
        <Route path="/view-all-users" component={ViewAllUsers} />
        <Route path="/send-mass-emails" component={SendMassEmails} />
        <Route path="/create-fundraiser" component={CreateFundraiser} />
      </div>
    </Router>
  );
};

export default Admin;
