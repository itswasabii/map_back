import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import useDisclose from "../utils/useDisclose";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function Sidebar({ nodeRef }) {
  const { isOpen, toggleDisclose, navRef } = useDisclose();
  const [fundraisers, setFundraisers] = useState();
  const [loading, setLoading] = useState(true);
  const url = "/api/fundraisers";
  useEffect(() => {
    const getFundraiser = async () => {
      try {
        const response = await fetch(url);
        if (!response)
          throw new Error(`HTTP Error! status: ${response.status}`);
        const data = await response.json();
        setFundraisers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getFundraiser();
  }, [url]);  
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
      display={{ base: "none", xl: "block" }}
      className={"border-r-[1px] border-[#e4e4e4]"}
      flexDir={"column"}
    >
      <NavLink className="leading-[40px] px-4 hover:bg-[#EDF2F7] w-[250px]" to={"/forum"}>
        Home
      </NavLink>
      <Flex
        onClick={toggleDisclose}
        cursor={"pointer"}
        align={"center"}
        px={4}
        lineHeight={"40px"}
        justify={"space-between"}
        bg={"#e4e4e4"}
      >
        <Text>Fundraiser</Text>
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
        className={
          "border-b-[1px] border-[#e4e4e4] overflow-y-scroll scrollbar overflow-x-hidden text-overflow-ellipsis whitespace-nowrap"
        }
        ref={navRef}
        flexDir={"column"}
        h={"500px"}
      >
        {fundraisers &&
          fundraisers.map((fundraiser) => (
            <Flex key={fundraiser.id}>              
              <NavLink to={`/forum/fundraiser/${fundraiser.id}`} className="truncate leading-[40px] px-4 hover:bg-[#EDF2F7]">{fundraiser.title}</NavLink>
            </Flex>
          ))}
      </Flex>
    </Box>
  );
}
Sidebar.propTypes = {
  nodeRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};
export default Sidebar;
