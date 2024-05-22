import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Box, Flex, Avatar, Text, Spinner } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { PiChatsLight } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import CreatePost from "./CreatePost"; // Import the CreatePost component

const Comments = lazy(() => import('./Comments'));

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndexes, setOpenIndexes] = useState([]);
  const commentsRefs = useRef([]);

  const showComments = (index) => {
    if (commentsRefs.current[index]) {
      commentsRefs.current[index].style.display = openIndexes.includes(index) ? "none" : "block";
      setOpenIndexes(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index) 
          : [...prev, index]
      );
    }
  };

  const url = "/api/posts";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <CreatePost />
      {loading ? (
        <Spinner />
      ) : (
        <div className="relative flex-1 w-full h-[calc(100vh-70px)] overflow-y-scroll mt-[70px] scrollbar">
          {posts.map((post, index) => (
            <Box
              key={index} 
              w={{ base: "100%", md: "80%", lg: "65%", xl: "50%" }}
              px={{ base: "5%", md: "3%" }}
              mt={"10px"}
              mx={"auto"}
            >
              <Box
                mx={"auto"}
                boxShadow="rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;"
                borderRadius="md"
                bg="white"
              >
                <Flex p={2} justify={"space-between"} align={"center"}>
                  <Flex gap={2} align={"center"}>
                    <Avatar
                      bg={"#101f3c"}
                      name={post.username}
                      src={post.profile_picture_url || ""}
                    />
                    <Text>{post.username}</Text>
                  </Flex>
                  <BsThreeDots fontSize={"1.4rem"} />
                </Flex>
                <Box p={4}>
                  <Text>{post.post_content}</Text>
                </Box>
                <Flex alignItems="center" gap={8} p={4}>
                  <Flex
                    borderRadius={"xl"}
                    p={1}
                    alignItems="center"
                    bg={"#e4e4e4"}
                  >
                    <AiOutlineHeart fontSize={"1.3rem"} />
                    <Text fontSize={"sm"} ml={1}></Text>
                  </Flex>
                  <Flex
                    borderRadius={"xl"}
                    p={1}
                    alignItems="center"
                    bg={"#e4e4e4"}
                    onClick={() => showComments(index)}
                    cursor={'pointer'}
                  >
                    <PiChatsLight fontSize={"1.3rem"} />
                    <Text fontSize={"sm"} ml={1}>
                      {post.the_comments ? post.the_comments.length : 0}
                    </Text>
                  </Flex>
                  <Flex
                    borderRadius={"xl"}
                    p={1}
                    alignItems="center"
                    bg={"#e4e4e4"}
                  >
                    <RiShareForwardLine fontSize={"1.3rem"} />
                    <Text fontSize={"sm"} ml={1}>
                      share
                    </Text>
                  </Flex>
                </Flex>
                <Suspense fallback={<Text>Loading...</Text>}>
  {post.the_comments !== undefined ? (
    <Comments
      nodeRef={(el) => (commentsRefs.current[index] = el)}
      comments={post.the_comments} 
      postId={post.post_id} // Pass postId correctly
    />
  ) : (
    <Text p={4}>No comments yet...</Text>
  )}
</Suspense>
              </Box>
            </Box>
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;
