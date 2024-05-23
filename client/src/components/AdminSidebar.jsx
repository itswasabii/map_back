import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import CreatePost from './CreatePost';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminSidebar = () => {
  const { userId,logout } = useAuth();
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    await logout();
    navigate("/user/login");
  };
  return (
    <Box
      as="div"
      w="250px"
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
      zIndex="1"
      className={"border-r-[1px] border-[#e4e4e4]"}
      display={"flex"}
      flexDir={"column"}
      pt={"30px"}
      bg={"#101f3c"}
      px={4}
    >
      <ul className="text-white">
        <li>
          <NavLink className="sidebar" to="/user/admin">Create Cohort</NavLink>
        </li>
        <li>
          <NavLink className="sidebar" to="/user/admin/view-all-users">View All Users</NavLink>
        </li>
        <li>
          <NavLink className="sidebar" to="/user/admin/send-mass-emails">Send Mass Emails</NavLink>
        </li>
        <li>
          <NavLink className="sidebar" to="/user/admin/create-fundraiser">Create Fundraiser</NavLink>          
        </li>
        <li>
        <NavLink className="sidebar" onClick={handleLogout}>Logout</NavLink>
        </li>
      </ul>
      <div className=" w-[150px] mt-[50px]">
          <CreatePost  />
        </div>
    </Box>
  );
};

export default AdminSidebar;
