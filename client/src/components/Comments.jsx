import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { VscSend } from "react-icons/vsc";
import PropTypes from "prop-types";
import { useAuth } from "../AuthContext"; // Assuming you have an AuthContext for managing authentication

function Comments({ postId, comments, nodeRef }) {
  const [newComment, setNewComment] = useState("");
  const { userId } = useAuth(); // Assuming useAuth provides the userId

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async () => {
    const url = `/api/comment/${postId}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId, // Include the userId in the request
          content: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      setNewComment(""); // Clear the comment input
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post your comment. Please try again later.");
    }
  };

  return (
    <Box h={"300px"} className="overflow-y-scroll scrollbar" px={4} ref={nodeRef}>
      <Flex mb={4}>
        <InputGroup>
          <Input
            variant={"flushed"}
            focusBorderColor="#101f3c"
            type="text"
            placeholder="Leave a comment"
            value={newComment}
            onChange={handleChange}
          />
          <InputRightAddon bg="transparent" outline={"none"} border={"none"}>
            <Button
              onClick={handleSubmit}
              bg="#101F3C"
              color="white"
              leftIcon={<VscSend />}
              _hover={{ bg: "#101f3c" }}
              px={4}
              py={2}
              rounded="md"
            >
              Post
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Flex>

      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Box
            key={index}
            className="border-b-[1px] border-[#e4e4e4]"
            mb={2}
            p={2}
          >
            <Text fontSize={"sm"}>{comment.content}</Text>
          </Box>
        ))
      ) : (
        <Text p={4}>No comments yet...</Text>
      )}
    </Box>
  );
}

Comments.propTypes = {
  nodeRef: PropTypes.func,
  comments: PropTypes.array.isRequired,
  postId: PropTypes.number.isRequired,
};

export default Comments;
