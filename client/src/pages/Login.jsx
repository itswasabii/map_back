import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../AuthContext";
import logo from "../assets/logo_black.png"; // Hardcoded logo import

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const history = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (values, { setSubmitting }) => {
    const { username, password } = values;
    const result = await login(username, password);
    
    if (result.success) {
      toast.success("Welcome Back!!", {
        position: "top-right",
        autoClose: 3000,
      });
      history("/forum");
    } else {
      setLoginError(result.message);
    }

    setSubmitting(false);
  };

  return (
    <Flex
      align={"stretch"}
      flexDir={{ base: "column", md: "row-reverse" }}
      className="h-screen"
    >
      <Flex
        flexDir={"column"}
        w={{ base: "100%", md: "50%" }}
        className="login-signup"
        p={4}
        maxW="lg"
        m="auto"
      >
        <Box className="login-form" p={6} borderRadius="md">
          <Image src={logo} alt="Logo" />
          <Text
            as="h1"
            fontSize={"1.7rem"}
            textAlign={"center"}
            className="underline underline-offset-[8px]"
            color={"#101f3c"}
            fontWeight={"bold"}
            my={4}
          >
            Login
          </Text>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <VStack spacing={4}>
                  <FormControl isInvalid={errors.username && touched.username}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field as={Input} id="username" name="username" />
                    <ErrorMessage
                      name="username"
                      component={FormErrorMessage}
                    />
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
                    Don't have an account?
                    <Link
                      as="span"
                      to="/user/signup"
                      className="login-link text-[#fa510f] mx-2 underline"
                    >
                      Signup
                    </Link>
                    |
                    <Link
                      as="span"
                      to="/user/forgot-password"
                      className="mx-2 login-link"
                      style={{ color: "teal.500" }}
                    >
                      Forgot password?
                    </Link>
                  </Text>
                  {loginError && <Text color="red.500">{loginError}</Text>}

                  <Button
                    w={"100%"}
                    type="submit"
                    bg={"#101f3c"}
                    _hover={{ bg: "101f3c" }}
                    color={"#fff"}
                    isLoading={isSubmitting}
                  >
                    Login
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
          School. As a member of our alumni community,
          <Text as="span" display={{ base: "none", md: "inline" }}>
            {" "}
            you gain access to a wealth of resources and opportunities designed
            to help you thrive, engage in lifelong learning, build meaningful
            connections, and take advantage of exclusive career services,
          </Text>{" "}
          you gain access to:
        </Text>
        <List spacing={3} px={{ base: 2, md: 8 }}>
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
        <Flex justify={"space-between"}>
        <Box
          cursor={"pointer"}
          my={"20px"}
          bg={"#FA510F"}
          color={"#fff"}
          w={"100px"}
          borderRadius={"md"}
          textAlign={"center"}
          lineHeight={"40px"}
          mx={{ base: 2, md: 8 }}
          as={Link} to={'/'}
        >
        <ArrowBackIcon />  Home 
        </Box>
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
          Fill the form to Login <ArrowForwardIcon />
        </Box>
        </Flex>
       
        <Image px={{ base: 2, md: 8 }} w={"400px"} />
      </Flex>
    </Flex>
  );
};

export default Login;
