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
      display={{ base: "none", xl: "flex" }}
      className={"border-r-[1px] border-[#e4e4e4]"}
      flexDir={"column"}
      pt={'70px'}
    >
      <NavLink
        className=" sidebar leading-[40px] px-4 hover:bg-[#EDF2F7] w-[250px]"
        to={"/forum"}
      >
        Home
      </NavLink>
      <NavLink
        className=" sidebar leading-[40px] px-4 hover:bg-[#EDF2F7] w-[250px]"
        to={"/cohort"}
      >
        Cohorts
      </NavLink>
      <NavLink
        className=" sidebar leading-[40px] px-4 hover:bg-[#EDF2F7] w-[250px]"
        to={"/forum/fundraising-donations"}
      >
        Fundraiser
      </NavLink>
    </Box>
  );
}
Sidebar.propTypes = {
  nodeRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};
export default Sidebar;
