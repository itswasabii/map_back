import React from 'react';
import { Box, Flex, Text, Switch, Avatar, calc } from '@chakra-ui/react';
import { ViewIcon, SettingsIcon, BellIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import TopNav from '../components/TopNav';
import Sidebar from '../components/Sidebar';
import { CgProfile } from "react-icons/cg";



const UserProfile = () => {
  return (
    <>
    <TopNav />
    <Sidebar />
    <Box  ml={{base:'0',lg:"250px"}}  mt={'70px'} p={4} className=' w-[100vw] max-[1200px]:w-[calc(100vw-250px)] h-[calc(100vh-70px)]  overflow-y-scroll mt-[70px] scrollbar'>
      <Flex align={'center'} mb={4}>
        <Avatar size={'xl'}     
         icon={<CgProfile />}            
            bg={"#101f3c"}
        src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
         />
        <Box ml={4}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            John Doe
          </Text>
          <Text fontSize={'md'} color={'gray.500'}>
            johndoe@example.com
          </Text>
        </Box>
      </Flex>
      
    </Box>
    </>
    
  );
};

export default UserProfile;
