import React from "react";
import { Box, Text, Flex, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { VscSend } from "react-icons/vsc";
import PropTypes from "prop-types";

function Comments({ comments, nodeRef }) {
  return (
    <Box
      h={"300px"}
      className="overflow-y-scroll scrollbar "
      px={4}
      ref={nodeRef} 
      style={{display:'none'}}     
    >
      <Flex mb={4}>
        <InputGroup>
          <Input variant={"flushed"} focusBorderColor="#101f3c" type="text" placeholder="leave a comment" />
          <InputRightAddon><VscSend /></InputRightAddon>
        </InputGroup>
      </Flex>
      {comments.length>0?<>{comments && comments.map((comment, index) => (
        <Box className="border-b-[1px] border-[#e4e4e4]" key={index}>
          <Text fontSize={"sm"} mb={2}>
            {comment.content}
          </Text>
        </Box>
      ))}</>:<Text p={4}>No comments yet...</Text>}
      
    </Box>
  );
}
Comments.propTypes = {
    nodeRef: PropTypes.func,
    comments:PropTypes.array
  };
export default Comments;
