/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import CreatePost from "./CreatePost";
import AdminSidebar from "./AdminSidebar";

const API_URL = "http://localhost:5555";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const CreateFundraiser = ({ onEndFundraiser }) => {
  const [formData, setFormData] = React.useState({
    user_id: "",
    title: "",
    description: "",
    goal_amount: "",
    end_date: "",
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
      const response = await api.post("/fundraisers", formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleEndFundraiser = async () => {
    try {
      await api.patch(`/fundraisers/${formData.id}`, { ended: true });
      alert("Fundraiser ended successfully.");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <AdminSidebar />
      <Box
        p={8}
        className="relative  scrollbar-f w-[calc(100vw-250px)]  ml-[250px] overflow-y-scroll"
      >
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="user_id"
              placeholder="User ID"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="goal_amount"
              placeholder="Goal Amount"
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="end_date"
              onChange={handleChange}
              required
            />
            <button type="submit">Create Fundraiser</button>
          </form>

          {/* Button to end the fundraiser */}
          {formData.end_date && new Date() >= new Date(formData.end_date) && (
            <button onClick={handleEndFundraiser}>End Fundraiser</button>
          )}
        </div>
      </Box>
    </div>
  );
};

export default CreateFundraiser;
