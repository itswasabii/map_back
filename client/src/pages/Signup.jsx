import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import gif from "../assets/nerd.png";
import logo from "../assets/logo_black.png";
import * as Yup from "yup";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Text,
  Flex,
  Heading,
  List,
  ListItem,
  ListIcon,
  Image,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      const { username, email, password } = values;
      const response = await fetch("http://127.0.0.1:5555/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.success("You are registered, please login", {
          position: "top-right",
          autoClose: 6000,
        });
        navigate("/user/login");
      } else {
        const errorData = await response.json();
        setSignupError(
          errorData.error || "Failed to signup. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setSignupError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex
      align={{base:'center',md:"stretch"}}
      flexDir={{ base: "column", md: "row-reverse" }}
      className="h-screen"
    >
      <Flex
        flexDir={"column"}
        w={{ base: "100%", md: "50%" }}
        className="login-signup"
        p={4}
        maxW="lg"
        m={'auto'}
      >
        <Box className="signup-form" p={6}  borderRadius="md">
          <Image src={logo} />
          <Text as="h1" fontSize={"1.7rem"} textAlign={'center'} className="underline underline-offset-[8px]" color={'#101f3c'} fontWeight={'bold'} my={4}>Sign Up</Text>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <VStack spacing={4}>
                  <FormControl isInvalid={errors.username && touched.username}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field
                      as={Input}
                      className="bg-[#EDF2F7]"
                      id="username"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      component={FormErrorMessage}
                    />
                  </FormControl>

                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" />
                    <ErrorMessage name="email" component={FormErrorMessage} />
                  </FormControl>

                  <FormControl isInvalid={errors.password && touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                    />
                    <ErrorMessage
                      name="password"
                      component={FormErrorMessage}
                    />
                  </FormControl>
                  <Text>
                    Already have an account?{" "}
                    <Link
                      to="/user/login"
                      className="login-link text-[#fa510f] underline"
                    >
                      Login
                    </Link>
                  </Text>

                  {signupError && <Text color="red.500">{signupError}</Text>}

                  <Button
                    w={"100%"}
                    type="submit"
                    bg={"#101f3c"}
                    _hover={{ bg: "101f3c" }}
                    color={"#fff"}
                    isLoading={isSubmitting}
                  >
                    Signup
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
      <Flex
        w={{ base: "100%", md: "50%" }}
        color={"#fff"}
        
        className=" bg-[#101f3c] flex-col"
        justify={"center"}
        px={4}
      >
        <Heading as="h1" size="xl" mb={4}>
          Moringa Alumnus Community!
        </Heading>
        <Text fontSize="md" maxW="2xl" mb={8}>
          Connect with a diverse network of innovative minds from Moringa
          School.As a member of our alumni community,
          <Text as="span" display={{ base: "none", md: "inline" }}>
            {" "}
            you gain access to a wealth of resources and opportunities designed
            to help you thrive, engage in lifelong learning, build meaningful
            connections, and take advantage of exclusive career services,
          </Text>{" "}
          you gain access to:
        </Text>
        <List spacing={3} px={{ base: 0, md: 8 }}>
          <ListItem>
            <ListIcon as={CheckIcon} color="#FA510F" />
            Lifelong learning opportunities through workshops and webinars.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="#FA510F" />
            Networking events to forge new connections and collaborations.
          </ListItem>

          <ListItem>
            <ListIcon as={CheckIcon} color="#FA510F" />
            Exclusive job postings and career advancement resources.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="#FA510F" />
            Mentorship programs to guide your professional growth.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="#FA510F" />
            Opportunities to give back by mentoring current students.
          </ListItem>
        </List>
        <Box
          cursor={"pointer"}
          my={"20px"}
          bg={"#FA510F"}
          color={"#fff"}
          w={"220px"}
          borderRadius={"md"}
          textAlign={"center"}
          lineHeight={"40px"}
          mx={{ base: 2, md: 8 }}
        >
          Fill the form to signup <ArrowForwardIcon />
        </Box>
        <Image px={{ base: 2, md: 8 }} w={"400px"} />
      </Flex>
      
    </Flex>
  );
};

export default Signup;
