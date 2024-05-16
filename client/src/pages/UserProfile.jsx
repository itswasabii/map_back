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
      <Box textAlign={'start'}>
        <Flex align={'center'} _hover={{ bg: '#EDF2F7' }} pl={3} py={2} borderRadius={'md'}>
          <ViewIcon mr={2} />
          <Text lineHeight={'45px'}>View Profile</Text>
        </Flex>
        <Flex align={'center'} _hover={{ bg: '#EDF2F7' }} pl={3} py={2} borderRadius={'md'}>
          <SettingsIcon mr={2} />
          <Text lineHeight={'45px'}>Settings</Text>
        </Flex>
        <Flex _hover={{ bg: '#EDF2F7' }} px={3} py={2} align={'center'} justify={'space-between'} borderRadius={'md'}>
          <Flex align={'center'}>
            <BellIcon mr={2} />
            <Text lineHeight={'45px'}>Notifications</Text>
          </Flex>
          <Switch />
        </Flex>
        <Flex align={'center'} _hover={{ bg: '#EDF2F7' }} pl={3} py={2} borderRadius={'md'}>
          <ExternalLinkIcon mr={2} />
          <Text lineHeight={'45px'}>Logout</Text>
        </Flex>
      </Box>
    </Box>
    </>
    
  );
};

export default UserProfile;
