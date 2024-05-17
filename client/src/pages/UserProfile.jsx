import React, { Suspense } from "react";
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

const UserPosts = React.lazy(() => import("../components/UserPosts"));
const EditProfile = React.lazy(() => import("../components/EditProfile"));
const UserComments = React.lazy(() => import("../components/UserComments"));

const UserProfile = () => {
  return (
    <>
      <TopNav />
      <Sidebar />
      <Box className="relative w-full h-[calc(100vh-70px)] lg:w-[calc(100vw-250px)] ml-[0px] lg:ml-[250px] overflow-y-scroll mt-[70px] scrollbar">
        <Flex
          align={"center"}
          mx={"auto"}
          boxShadow={"md"}
          mt={"10px"}
          maxW={"800px"}
          mb={4}
        >
          <Avatar
            size={"xl"}
            icon={<CgProfile />}
            bg={"#101f3c"}
            src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
          />
          <Box ml={4}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              John Doe
            </Text>
            <Text fontSize={"md"} color={"gray.500"}>
              johndoe@example.com
            </Text>
          </Box>
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
