import {
  Flex
} from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/Sidebar";
import EventsNav from "../components/EventsNav";
import TopNav from "../components/TopNav";
import Posts from "../components/Posts";

function Forum() {
  return (
    <>
    <TopNav />
    <Flex pos={'relative'}>
      <Sidebar />
     <Posts/>
      <EventsNav />
    </Flex>
    </>
  );
}

export default Forum;
