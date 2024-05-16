import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import useDisclose from "../utils/useDisclose";

function Sidebar() {
  const { isOpen, toggleDisclose, navRef } = useDisclose();
  return (
    <Flex
      w={"250px"}
      // flex= "1 2 450px" 
      // flexBasis={'250px'}
      display={{ base: "none", xl: "flex" }}
      flexDir={"column"}
      py={4}
      as="div"
      bg="#fff"
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
      zIndex="1"
      mt={"70px"}
      className="h-[100vh] flex-1  border border-r-[1px] border-[#e4e4e4]"
      gap={2}
    >
      <Text
        _hover={{ bg: "#e4e4e4" }}
        borderRadius={"md"}
        pl={3}
        lineHeight={"40px"}
        maxW={'220px'}
      >
        Home
      </Text>
      <Flex
        onClick={toggleDisclose}
        cursor={"pointer"}
        align={"center"}
        px={4}
        lineHeight={"40px"}
        justify={"space-between"}
        bg={"#e4e4e4"}
      >
        <Text>Cohort</Text>
        <ChevronDownIcon
          fontSize={"1.35rem"}
          display={isOpen ? "none" : "block"}
        />
        <ChevronUpIcon
          fontSize={"1.35rem"}
          display={isOpen ? "block" : "none"}
        />
      </Flex>
      <Flex
        className={"border-b-[1px] border-[#e4e4e4]"}
        ref={navRef}
        flexDir={"column"}
      >
        <Text px={4} _hover={{ bg: "#EDF2F7" }} lineHeight={"40px"}>
          SDF-TF08
        </Text>
        <Text px={4} _hover={{ bg: "#EDF2F7" }} lineHeight={"40px"}>
          SDF-TF02
        </Text>
        <Text px={4} _hover={{ bg: "#EDF2F7" }} lineHeight={"40px"}>
          SDF-TF05
        </Text>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
