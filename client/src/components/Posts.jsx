import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    Avatar,
    calc,
} from "@chakra-ui/react";
import IMGL0721 from "../assets/IMGL0721.jpeg";
import fund from "../assets/logo_black.png";
import volunteer from "../assets/volunteer.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { PiChatsLight } from "react-icons/pi";
import logo from "../assets/title_logo.png";
import { BsThreeDots } from "react-icons/bs";

function Posts() {
    const sectionsData = [
      {
        logo: logo,
        username: "Moringa School",
        timeAgo: "3 hours Ago",
        title: "Section 1 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: IMGL0721,
        likes: 40,
        comments: 20,
      },
      {
        logo: "path/to/logo2",
        username: "Company Name 2",
        timeAgo: "2 days Ago",
        title: "Section 2 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: fund,
        likes: 50,
        comments: 15,
      },
      {
        logo: "path/to/logo3",
        username: "Company Name 3",
        timeAgo: "1 week Ago",
        title: "Section 3 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: volunteer,
        likes: 60,
        comments: 25,
      },
      {
        logo: "path/to/logo4",
        username: "Company Name 4",
        timeAgo: "2 weeks Ago",
        title: "Section 4 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: "",
        likes: 70,
        comments: 30,
      },
      {
        logo: "path/to/logo5",
        username: "Company Name 5",
        timeAgo: "1 month Ago",
        title: "Section 5 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: "",
        likes: 80,
        comments: 35,
      },
      {
        logo: "path/to/logo6",
        username: "Company Name 6",
        timeAgo: "2 months Ago",
        title: "Section 6 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: "",
        likes: 90,
        comments: 40,
      },      {
        logo: logo,
        username: "Moringa School",
        timeAgo: "3 hours Ago",
        title: "Section 1 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: IMGL0721,
        likes: 40,
        comments: 20,
      },
      {
        logo: "path/to/logo2",
        username: "Company Name 2",
        timeAgo: "2 days Ago",
        title: "Section 2 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: fund,
        likes: 50,
        comments: 15,
      },
      {
        logo: "path/to/logo3",
        username: "Company Name 3",
        timeAgo: "1 week Ago",
        title: "Section 3 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: volunteer,
        likes: 60,
        comments: 25,
      },
      {
        logo: "path/to/logo4",
        username: "Company Name 4",
        timeAgo: "2 weeks Ago",
        title: "Section 4 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: "",
        likes: 70,
        comments: 30,
      },
      {
        logo: "path/to/logo5",
        username: "Company Name 5",
        timeAgo: "1 month Ago",
        title: "Section 5 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: "",
        likes: 80,
        comments: 35,
      },
      {
        logo: "path/to/logo6",
        username: "Company Name 6",
        timeAgo: "2 months Ago",
        title: "Section 6 Title",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis dicta optio, distinctio aspernatur quisquam perferendis voluptates inventore ratione quia maxime tenetur esse architecto ducimus itaque exercitationem dignissimos assumenda cum!",
        imageUrl: "",
        likes: 90,
        comments: 40,
      },
      ];
  return (
    <div className="relative flex-1 w-full h-[calc(100vh-70px)]  overflow-y-scroll mt-[70px] scrollbar">
    {sectionsData.map((section, index) => (
      <Box
        key={index}
        w={{ base: "100%", md: "80%",lg:"65", xl: '50%'}}
        px={{ base: "5%", md: "3%" }}
        mt={'10px'}
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
              <Avatar bg={"#101f3c"} name={section.companyName} src={section.logo} />
              <Text fontSize={".9rem"} fontWeight={"bold"}>
                {section.username} - {section.timeAgo}
              </Text>
            </Flex>
            <BsThreeDots fontSize={"1.4rem"} />
          </Flex>
          <Box p={4}>
            <Heading fontSize={"1.15rem"}>{section.title}</Heading>
            <Text>
              {section.description}
            </Text>
          </Box>

          <Box h={'100%'}mx="auto" display={section.imageUrl==""?'none':'block'}>
            <Image objectFit="contain" h={"100%"} w={"100%"} src={section.imageUrl} />
          </Box>
          <Flex alignItems="center" gap={8} p={4}>
            <Flex
              borderRadius={"xl"}
              p={1}
              alignItems="center"
              bg={"#e4e4e4"}
            >
              <AiOutlineHeart fontSize={"1.3rem"} />
              <Text fontSize={"sm"} ml={1}>
                {section.likes}
              </Text>
            </Flex>
            <Flex
              borderRadius={"xl"}
              p={1}
              alignItems="center"
              bg={"#e4e4e4"}
            >
              <PiChatsLight fontSize={"1.3rem"} />
              <Text fontSize={"sm"} ml={1}>
                {section.comments}
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
        </Box>
      </Box>
    ))}
    </div>
  )
}

export default Posts