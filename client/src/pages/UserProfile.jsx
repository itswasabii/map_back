import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../AuthContext";

const UserPosts = React.lazy(() => import("../components/UserPosts"));
const EditProfile = React.lazy(() => import("../components/EditProfile"));
const UserComments = React.lazy(() => import("../components/UserComments"));

const UserProfile = () => {
  const [userData,setUserData] = useState([])
  const{userId} = useAuth()
  const url =`/api/users/${userId}`
  useEffect(()=>{
    const getUser = async ()=>{
      try {
        const response = await fetch(url)
        if(!response.ok) throw new Error("HTTP Error ! Status: ",response.status)
        const data = await response.json() 
        
        setUserData(data)
      } catch (error) {
        console.log(error.message)
      }
    }; getUser()
  },[url])
  
  return (
    <>
      <TopNav />
      <Sidebar />
      <Box className="relative w-full h-[calc(100vh-70px)] lg:w-[calc(100vw-250px)] ml-[0px] lg:ml-[250px] overflow-y-scroll mt-[70px]">
        <Flex
          align="stretch"
          mx="auto"
          gap={2}
          className="max-w-[800px] px-4 py-4 mt-[10px] border border-[#E4e4e4] mb-4 rounded-t-lg border-b-0"
        >
          
            <Flex flexDir={'column'} gap={1} ml={4} w="50%">
            
            <Avatar
              size="2xl"
              icon={<CgProfile />}
              bg="#101f3c"
              src={userData.profile_picture_url}
              mb={'10px'}
            />
            
              <Text fontSize="xl" fontWeight="bold">
                {userData.username}
              </Text>
              <Text fontSize="md" >
                {userData.email}
              </Text>
              <p>{userData.location}, Joined : {new Date(userData.joined_at).toDateString()}</p>      
          
        </Flex>
          <Flex gap={3} flexDir="column"  w="50%">
            <Text>
              <strong>Occupation:</strong>{userData.occupation}
            </Text>
            <Text >
             <strong> Bio: </ strong>{userData.bio}             
            </Text>
            <Text>
              <strong>Qualification: </strong>{userData.qualification}
            </Text>
            <Text>
              
            </Text>           
          </Flex>
        </Flex>

        <Box mx={"auto"} maxW={"800px"}>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Edit Profile</Tab>
              <Tab>Posts</Tab>
              <Tab>Comments</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Suspense fallback={<Spinner />}>
                  <EditProfile />
                </Suspense>
              </TabPanel>
              <TabPanel>
                <Suspense fallback={<Spinner />}>
                  <UserPosts />
                </Suspense>
              </TabPanel>
              <TabPanel>
                <Suspense fallback={<Spinner />}>
                  <UserComments />
                </Suspense>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;