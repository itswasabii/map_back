import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@chakra-ui/icons";

function Testimonials() {
  let sliderRef = useRef(null);
   const next = () => {
     sliderRef.slickNext();
   };
   const previous = () => {
     sliderRef.slickPrev();
   };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
  const testimonials = [
    {
      name: "Sarah Johnson",
      photo:
        "https://peopleofcolorintech.com/wp-content/uploads/2023/10/temi_nocsdegree.jpg",
      field: "Data scientist",
      testimonial:
        "Moringa School provided me with the skills and confidence to pursue a successful career in tech. The hands-on projects and supportive learning environment equipped me with real-world experience that was invaluable in landing my dream job. I'm grateful for the opportunities Moringa School has provided me and would highly recommend it to anyone looking to kickstart their career in tech.",
      linkedin: "https://www.linkedin.com/in/sarahjohnson",
      instagram: "https://www.instagram.com/sarah_johnson",
      twitter: "https://twitter.com/sarah_johnson",
    },
    {
      name: "David Smith",
      photo: "https://bit.ly/code-beast",
      field: "Data scientist",
      testimonial:
        "Moringa School was a life-changing experience for me. The rigorous curriculum and supportive community pushed me to excel beyond my expectations. The practical skills I gained during the program were instrumental in securing my first job in tech. I'm incredibly grateful for the opportunities Moringa School has provided me and excited for what the future holds.",
      linkedin: "https://www.linkedin.com/in/davidsmith",
      instagram: "https://www.instagram.com/david_smith",
      twitter: "https://twitter.com/david_smith",
    },
    {
      name: "Emily Byrde",
      photo:
        "https://peopleofcolorintech.com/wp-content/uploads/2021/11/3V7A1105.jpeg",
      field: "TM Moringa",
      testimonial:
        "The curriculum at Moringa School is rigorous and comprehensive, covering all aspects of data science from data wrangling to machine learning. The hands-on projects and real-world applications provided me with the practical skills and confidence to succeed in the competitive field of data science. I'm grateful for the support and mentorship I received at Moringa School, which played a crucial role in launching my career in tech.",
      linkedin: "https://www.linkedin.com/in/emilychen",
      instagram: "https://www.instagram.com/emily_chen",
      twitter: "https://twitter.com/emily_chen",
    },
    {
      name: "Michael Brown",
      photo: "https://bit.ly/sage-adebayo",
      field: "Software engineering",
      testimonial:
        "Moringa School provided me with the practical skills and industry knowledge needed to succeed in the fast-paced world of software development. The hands-on projects and collaborative learning environment helped me build a strong foundation in web development and prepared me for the challenges of working in tech. I'm grateful for the opportunities Moringa School has provided me and excited for what the future holds.",
      linkedin: "https://www.linkedin.com/in/michaelbrown",
      instagram: "https://www.instagram.com/michael_brown",
      twitter: "https://twitter.com/michael_brown",
    },
    {
      name: "Mary Otieno",
      photo:
        "https://media.istockphoto.com/id/1398694601/photo/portrait-of-black-woman-as-software-developer.jpg?s=612x612&w=0&k=20&c=4YmakHd_3zZ6sQzrlgy4ZtLsUS2F1b7Qx4juR46XwAg=",
      field: "Software engineering",
      testimonial:
        "The instructors at Moringa School were incredibly knowledgeable and supportive, providing me with personalized guidance and mentorship throughout the program. The hands-on projects and collaborative learning environment helped me develop practical skills and build a strong network within the tech community. I'm grateful for the opportunities Moringa School has provided me and excited to continue making a difference in the world through technology.",
      linkedin: "https://www.linkedin.com/in/oliviawang",
      instagram: "https://www.instagram.com/olivia_wang",
      twitter: "https://twitter.com/olivia_wang",
    },
    {
      name: "Daniel Garcia",
      photo: "https://bit.ly/prosper-baba",
      field: "Software engineering",
      testimonial:
        "Moringa School provided me with the hands-on experience and practical skills needed to succeed in the competitive field of web development. The supportive learning environment and dedicated instructors helped me overcome challenges and push my limits as a developer. I'm grateful for the opportunities Moringa School has provided me and excited to continue growing and learning in my career.",
      linkedin: "https://www.linkedin.com/in/danielgarcia",
      instagram: "https://www.instagram.com/daniel_garcia",
      twitter: "https://twitter.com/daniel_garcia",
    },
  ];
  return (
    <div className="slider-container relative">
      <Flex justify={"space-between"} pos={"relative"}>
        <ChevronLeftIcon
          fontSize={30}
          onClick={() => next()}
          pos={"absolute"}
          top={{ md: "110", lg: "150" }}
          left={-10}
          color={"#101f3c"}
          bg={"#fa510f"}
          borderRadius={"50%"}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        />
        <ChevronRightIcon
          fontSize={30}
          onClick={() => previous()}
          pos={"absolute"}
          top={{ md: "110", lg: "150" }}
          right={-10}
          color={"#101f3c"}
          bg={"#fa510f"}
          borderRadius={"50%"}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        />
      </Flex>
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {testimonials.map((t, index) => (
          <Flex
            key={index}
            borderRadius={"md"}
            bg={"#101F3C"}
            p={4}
            mt={2}
            mb={2}
            color={"#fff"}
            w={"100%"}
            flexDir={{ base: "column", md: "row" }}
          >
            <Flex flexDir={"column"}>
              <Avatar
                alignSelf={"center"}
                size={{ base: "xl", md: "2xl" }}
                name={t.name}
                src={t.photo}
                mb={4}
              />
              <Box ml={4}>
                <Text textAlign={"center"}> "{t.testimonial}"</Text>
                <Text
                  mt={2}
                  color={"#FA510F"}
                  fontStyle={"italic"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  {t.field} - {t.name}
                </Text>
              </Box>
            </Flex>
          </Flex>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
