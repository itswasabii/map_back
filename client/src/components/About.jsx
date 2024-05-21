import React from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

function About() {
  const bgColor = useColorModeValue('white', 'gray.800'); // Dynamic background color based on color mode
  const textColor = useColorModeValue('gray.800', 'white'); // Dynamic text color based on color mode

  return (
    <Box className="about-us-container" p={8} bg={bgColor} color={textColor}>
      <Box as="section" className="section-introduction" mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          WELCOME TO MORINGA ALUMNI PLATFORM
        </Heading>
        <Text>
          Since our establishment, the Moringa Alumni Platform has been dedicated to fostering connections and empowering
          the vibrant community of Moringa School alumni. With a focus on collaboration and growth, we aim to create
          opportunities for alumni to network, share experiences, and continue their professional development journey.
        </Text>
      </Box>
      <Box as="section" className="section-mission" mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          OUR MISSION
        </Heading>
        <Text>
          Our mission at the Moringa Alumni Platform is to provide a supportive and inclusive space for Moringa School
          alumni to stay connected, inspired, and empowered. We are committed to facilitating collaboration, knowledge
          sharing, and skill development to help our alumni thrive in their careers and make a positive impact in the
          tech industry and beyond.
        </Text>
      </Box>
      <Box as="section" className="section-vision" mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          OUR VISION
        </Heading>
        <Text>
          Our vision is to build a strong and engaged community of Moringa School alumni who are leaders and innovators
          in the technology ecosystem. We aspire to create a network that fosters lifelong learning, entrepreneurship,
          and social impact, driving positive change and shaping the future of the tech industry.
        </Text>
      </Box>
      <Box as="section" className="section-values" mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          OUR VALUES
        </Heading>
        <Text>
          <ul>
            <li>Community</li>
            <li>Innovation</li>
            <li>Growth</li>
            <li>Inclusivity</li>
            <li>Empowerment</li>
          </ul>
        </Text>
      </Box>
      <Box as="section" className="section-team" mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          MEET OUR TEAM
        </Heading>
        <Text>
          Our team is composed of passionate individuals dedicated to supporting and empowering the Moringa alumni
          community. From our alumni ambassadors to our support staff, each member plays a vital role in creating
          meaningful connections and fostering opportunities for growth and collaboration.
        </Text>
      </Box>
      <Box as="section" className="section-contact" mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          CONTACT US
        </Heading>
        <Text>
          If you have any questions or would like to get involved with the Moringa Alumni Platform, please contact us
          at <a href="mailto:alumni@moringaschool.com">alumni@moringaschool.com</a>. We'd love to hear from you and
          welcome you to our community!
        </Text>
      </Box>
    </Box>
  );
}

export default About;
