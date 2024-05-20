import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

function History() {
  let sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const historySlides = [
    {
      date: "2014",
      title: "Founding",
      content:
        "Moringa School was founded with a vision to provide high-quality tech education in Africa and bridge the gap between education and employment.",
    },
    {
      date: "2015",
      title: "Expansion",
      content:
        "Expanded its offerings to include a wider range of courses in software development and data science, catering to the growing demand for tech skills.",
    },
    {
      date: "2018",
      title: "Partnerships",
      content:
        "Forged partnerships with leading tech companies and organizations to enhance its curriculum and provide students with real-world experience through projects and internships.",
    },
    {
      date: "2020",
      title: "Online Learning",
      content:
        "Amidst the COVID-19 pandemic, Moringa School transitioned to online learning, ensuring continuity in education and reaching students across Africa with its remote learning programs.",
    },
    {
      date: "2021",
      title: "Global Reach",
      content:
        "With a focus on global expansion, Moringa School established partnerships and initiatives to reach learners worldwide, advancing its mission to empower individuals through tech education.",
    },
    {
      date: "2022",
      title: "Innovation Hub",
      content:
        "Launched its Innovation Hub, providing a collaborative space for students, alumni, and industry partners to work on cutting-edge projects and innovations.",
    },
    {
      date: "2023",
      title: "Industry Recognition",
      content:
        "Received industry recognition for its innovative curriculum and high job placement rates, solidifying its position as a leading tech education provider in Africa.",
    },
    {
      date: "2024",
      title: "Future Expansion",
      content:
        "Looking ahead to the future, Plans to further expand its offerings and geographic reach, continuing to empower individuals and transform lives through tech education.",
    },
  ];


  return (
    <div className="">
      <Flex gap={4} flexWrap={'wrap'} alignItems={'stretch'} mx={"auto"}>
        {historySlides.map((slide, index) => (
          <Box key={index} color={"#111"} w={400} py={2} px={4}>
            <Text as={"sup"} fontWeight={"bold"}>
              {slide.date}
            </Text>
            <Heading as={"h6"} w={"auto"} fontSize="2xl" mb={4}>
              {slide.title}
            </Heading>
            <Text w={"auto"}>{slide.content}</Text>
          </Box>
        ))}
      </Flex>
    </div>
  );
}

export default History;
