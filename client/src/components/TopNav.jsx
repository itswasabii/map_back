import React from "react";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Image,
  InputGroup,
  InputLeftAddon,
  Text,
  Avatar,
  AvatarBadge,
  Tooltip
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import logo from "../assets/logo_black.png";
import logo_two from "../assets/title_logo.png";
import MobileNav from "./MobileNav";
import { AiOutlineUser } from "react-icons/ai";
import useDisclose from "../utils/useDisclose";
import useToggle from "../utils/useToggle";
import Profilemodal from "./Profilemodal";

function TopNav() {
  
  const {navRef,toggleDisclose} = useDisclose()
  const{nodeRef,toggleModal} = useToggle()
  

  return (
    <>
      <Flex
        justify="space-between"
        width="100%"
        px={{ base: 4, md: 50 }}
        h={70}
        align="center"
        top={0}
        pos="fixed"
        zIndex="2"
        borderBottom="1px"
        borderColor="#E4E4E4"
        bg="#fff"
      >
        <Flex gap={2} align={"center"}>
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            variant="outline"
            onClick={toggleDisclose}
            display={{ base: "flex", xl: "none" }}
          />
          <Box h="70px" display={{ base: "none", lg: "block" }}>
            <Image h="100%" w="100%" src={logo} />
          </Box>
          <Box w="50px" display={{ base: "block", lg: "none" }}>
            <Image h="100%" w="100%" src={logo_two} />
          </Box>
        </Flex>
        <Box>
          <InputGroup>
            <InputLeftAddon>
              <SearchIcon />
            </InputLeftAddon>
            <Input
              // variant="filled"
              outline={"#101f3c"}
              type="text"
              placeholder="search"
              focusBorderColor="#EDF2F7"
              bg='#EDF2F7'              
            />
          </InputGroup>
        </Box>
        <Box display={"flex"} pos={'relative'} align="center"  gap={4}>
          <Flex align={"center"} bg={'#EDF2F7'} borderRadius={'md'} p={2} cursor={"pointer"} gap={2}>
            <Tooltip hasArrow label='create post' placement='top'>
            <AddIcon />
            
            </Tooltip>
            <Text display={{base:"none",md:"inline"}}>create post</Text>
          </Flex>
          <Avatar
            icon={<AiOutlineUser fontSize="1.5rem" />}
            size="sm"
            bg={"#101f3c"}
            onClick={toggleModal}
            cursor={"pointer"}
          >
            <AvatarBadge boxSize=".6rem" bg="green.500" />
          </Avatar>
          <Profilemodal nodeRef={nodeRef} />
        </Box>
      </Flex>
      <MobileNav nodeRef={navRef} />
    </>
  );
}

export default TopNav;
