import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Section = ({ title, content }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box mb={8}>
      <Heading as="h2" size="xl" mb={4} role="heading" aria-level={2}>
        {title}
      </Heading>
      {typeof content === 'string' ? <Text>{content}</Text> : content}
    </Box>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

const About = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box className="about-us-container" mt={'70px'} p={8} bg={bgColor} color={textColor}>
      <Section
        title="WELCOME TO MORINGA ALUMNI PLATFORM"
        content="Since our establishment, the Moringa Alumni Platform has been dedicated to fostering connections and empowering the vibrant community of Moringa School alumni. With a focus on collaboration and growth, we aim to create opportunities for alumni to network, share experiences, and continue their professional development journey."
      />
      <Section
        title="OUR MISSION"
        content="Our mission at the Moringa Alumni Platform is to provide a supportive and inclusive space for Moringa School alumni to stay connected, inspired, and empowered. We are committed to facilitating collaboration, knowledge sharing, and skill development to help our alumni thrive in their careers and make a positive impact in the tech industry and beyond."
      />
      <Section
        title="OUR VISION"
        content="Our vision is to build a strong and engaged community of Moringa School alumni who are leaders and innovators in the technology ecosystem. We aspire to create a network that fosters lifelong learning, entrepreneurship, and social impact, driving positive change and shaping the future of the tech industry."
      />
      <Section
        title="OUR VALUES"
        content={
          <UnorderedList spacing={2}>
            <ListItem>Community</ListItem>
            <ListItem>Innovation</ListItem>
            <ListItem>Growth</ListItem>
            <ListItem>Inclusivity</ListItem>
            <ListItem>Empowerment</ListItem>
          </UnorderedList>
        }
      />
      <Section
        title="MEET OUR TEAM"
        content="Our team is composed of passionate individuals dedicated to supporting and empowering the Moringa alumni community. From our alumni ambassadors to our support staff, each member plays a vital role in creating meaningful connections and fostering opportunities for growth and collaboration."
      />
      <Section
        title="CONTACT US"
        content={
          <>
            If you have any questions or would like to get involved with the Moringa Alumni Platform, please contact us at{' '}
            <a href="mailto:alumni@moringaschool.com">alumni@moringaschool.com</a>. We'd love to hear from you and welcome you to our community!
          </>
        }
      />
    </Box>
  );
};

export default About;
