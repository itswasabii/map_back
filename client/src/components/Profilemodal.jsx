import React from "react";
import PropTypes from "prop-types";
import { Box, Text, Switch, Flex } from "@chakra-ui/react";
import {  
  SettingsIcon,
  BellIcon,    
} from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";


function Profilemodal({ nodeRef }) {
  const { userId,logout } = useAuth();
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    await logout();
    navigate("/user/login");
  };
    
    
  return (
    <div
      ref={nodeRef}
      className="absolute hidden shadow-md w-[250px] top-[55px] right-[0] md:right-[-30px] rounded-md bg-white"
    >
      <Box textAlign={"start"}>
        <Flex align={"center"} _hover={{ bg: "#EDF2F7" }} pl={3}>
          <CgProfile fontSize={'1.2rem'} mr={4} />
          <Text lineHeight={"45px"}ml={2} cursor={'pointer'} as={Link} to={`/forum/userprofile/${userId}`} >View Profile</Text>
        </Flex>

        <Flex align={"center"} _hover={{ bg: "#EDF2F7" }} pl={3}>
          <SettingsIcon mr={2} />
          <Text lineHeight={"45px"}>Settings</Text>
        </Flex>

        <Flex
          _hover={{ bg: "#EDF2F7" }}
          px={3}
          align={"center"}
          justify={"space-between"}
        >
          <Flex align={"center"}>
            <BellIcon mr={2} />
            <Text lineHeight={"45px"}>Notifications</Text>
          </Flex>
          <Switch />
        </Flex>

        <Flex align={"center"} _hover={{ bg: "#EDF2F7" }} onClick={handleLogout} pl={3} cursor={'pointer'}>
          <VscSignOut fontSize={'1.2rem'} />
          <Text lineHeight={"45px"} ml={2}>Logout</Text>
        </Flex>
      </Box>
    </div>
  );
}
Profilemodal.propTypes = {
  nodeRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export default Profilemodal;
