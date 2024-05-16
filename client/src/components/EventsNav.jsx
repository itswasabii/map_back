import { Box, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";

function EventsNav() {
  const events = [
    {
      name: "Africa Tech Summit",
      date: "February 14-15, 2024",
      time: "12:00 AM",
      location: "The Sarit Expo Centre, Nairobi",
      description:
        "An annual summit connecting African tech leaders with international players to discuss innovations, challenges, and the future of tech in Africa. Features expert speakers, networking opportunities, and business development sessions.",
      url: "https://www.africatechsummit.com/nairobi/register/",
    },
    {
      name: "Kenya Tech Summit",
      date: "July 12, 2024",
      time: "10:00 AM",
      location: "To be announced",
      description:
        "Hosted by the Global Startup Ecosystem in partnership with Google Cloud, AWS, and IBM Cloud. Brings together innovators and tech giants to explore advancements and opportunities in the tech sector.",
      url: "https://globalstartupecosystem.com/kenya/",
    },
    {
      name: "Technical Masterclass in Energy Transition",
      date: "July 15, 2024",
      time: "9:00 AM",
      location: "Nairobi",
      description:
        "A masterclass focusing on the transition to sustainable energy sources, featuring expert-led sessions on the latest trends and technologies in energy.",
      url: "https://energytransitionmasterclass.com/",
    },
    {
      name: "Africa eDigital Connect Summit",
      date: "July 14, 2024",
      time: "To be announced",
      location: "Nairobi",
      description:
        "Organized by eDigital Connect in partnership with Dime Tech Group, this summit focuses on digital transformation and connectivity across Africa, including discussions on digital policies, innovations, and investments.",
      url: "https://africaedigitalconnect.com/",
    },
    {
      name: "Global Game Jam",
      date: "January 26-28, 2024",
      time: "To be announced",
      location: "Nairobi",
      description:
        "An event for game developers to create an original game in 48 hours based on a surprise theme. Provides a platform for creativity and collaboration among participants.",
      url: "https://globalgamejam.org/",
    },
  ];

  return (
    <Box
      as={"div"}      
      className="flex flex-col absolute mt-[80px] top-0 right-[20px]  w-[300px] overflow-y-hidden overflow-hidden h-[600px] rounded md  text-white bg-[#101f3c]"
      display={{ base: "none", 'xl': "flex" }}  
      
    >
      <Text
        fontWeight="bold"
        casing="uppercase"
        fontSize=".95rem"
        py={4}
        px={6}
      >
        Upcoming events
      </Text>
      <VStack
        // divider={<StackDivider borderColor="gray.200" />}
        spacing={0}
        align="stretch"
        flex={1}
        px={6}
      >
        {events.map((e, index) => (
          <Box key={index} py={4}>
            <Text fontWeight="bold">{e.name}</Text>
            <Text fontWeight="bold" fontSize=".7rem">
              {e.date} - {e.time}
            </Text>
            {/* <Text fontSize=".9rem">{e.description}</Text> */}
            <Text fontWeight="bold" fontSize=".85rem">
              Location: {e.location}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default EventsNav;
