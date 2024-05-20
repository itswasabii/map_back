import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/logo_black.png";
import { NavLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

function Nav() {
  return (
    <Flex
      justify="space-between"
      width={"100%"}
      px={{ base: 4, md: 50 }}
      h={70}
      align={"center"}
      top={0}
      pos={"fixed"}
      zIndex={"2"}
      borderBottom="1px"
      borderColor="#E4E4E4"
      bg={"#fff"}
    >
      <Box h={"70px"}>
        <Image h={"100%"} w={"100%"} src={logo} />
      </Box>
      <Flex gap={8} display={{ base: "none", md: "flex" }} color={"#101f3c"}>
        <NavLink className="links" to={"/success-stories"}>
          Success Stories
        </NavLink>
        <NavLink className="links" to={"/tech-news"}>
          Tech News
        </NavLink>
        <NavLink className="links" to={"/fundraising&donations"}>
          Fundraising
        </NavLink>
        <NavLink className="links" to={"/forum"}>
          Forum
        </NavLink>
      </Flex>
      <Box display={{ base: "flex", md: "none" }}>
        {" "}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>
              <NavLink to={"/success-stories"}>Success Stories</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={"/tech-news"}>Tech News</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={"/fundraising&donations"}>Fundraising</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={"/forum"}>Forum</NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Nav;
