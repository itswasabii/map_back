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
      <Box className="relative w-full h-[calc(100vh-70px)] lg:w-[calc(100vw-250px)] ml-[0px] lg:ml-[250px] overflow-y-scroll mt-[70px]">
        <Flex
          align="stretch"
          mx="auto"
          gap={2}
          className="max-w-[800px] px-4 py-4 mt-[10px] border border-[#E4e4e4] mb-4 rounded-t-lg border-b-0"
        >
          <Box gap={2} ml={4} w="50%">
            <Flex gap={2}>
              <Avatar
                size="xl"
                icon={<CgProfile />}
                bg="#101f3c"
                src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
              />
              <Box px={2}>
                <Text fontSize="xl" fontWeight="bold">
                  John Doe
                </Text>
                <Text fontSize="md" >
                  johndoe@example.com
                </Text>
              </Box>
            </Flex>
            <Text  pt={4}>
              Bio: <br />
              It is possible to force an ignored file to be committed to the
              repository.
            </Text>
          </Box>
          <Flex gap={3} flexDir="column"  w="50%">
            <Text>
              <strong>Occupation:</strong> Software Developer
            </Text>
            <Text>
              <strong>Qualification:</strong> <br />
              Nature as instead family good box management green. House
              everything democratic factor someone. Play memory defense
              consider.
            </Text>
            <Text>
              <strong>Location:</strong> - <strong>Joined at:</strong>
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
