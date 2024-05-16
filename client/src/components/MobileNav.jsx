import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import useDisclose from "../utils/useDisclose";

const MobileNav = ({ nodeRef }) => {
const {isOpen,toggleDisclose,navRef} = useDisclose();
  return (
    <Box
      as="div"
      bg="#fff"
      w="250px"
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
      zIndex="1"
      mt={"70px"}
      ref={nodeRef}
      display={"none"}
      className={"border-r-[1px] border-[#e4e4e4]"}
    >
      <Flex
        onClick={toggleDisclose}
        cursor={"pointer"}
        align={"center"}
        px={4}
        lineHeight={"40px"}
        justify={"space-between"}
        bg={'#e4e4e4'}
      >
        <Text>Cohort</Text>
        <ChevronDownIcon fontSize={'1.35rem'}  display={isOpen ? "none" : "block"} />
        <ChevronUpIcon fontSize={'1.35rem'}  display={isOpen ? "block" : "none"} />
      </Flex>
      <Flex  className={"border-b-[1px] border-[#e4e4e4]"} ref={navRef} flexDir={"column"}>
        <Text px={4} _hover={{bg:"#e4e4e4"}} lineHeight={'40px'}>SDF-TF08</Text>
        <Text px={4} _hover={{bg:"#e4e4e4"}} lineHeight={'40px'}>SDF-TF02</Text>
        <Text px={4} _hover={{bg:"#e4e4e4"}} lineHeight={'40px'}>SDF-TF05</Text>
      </Flex>
    </Box>
  );
};
MobileNav.propTypes = {
  nodeRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export default MobileNav;
