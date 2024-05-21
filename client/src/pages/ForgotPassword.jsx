import React, { useState } from "react";
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
import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";
import logo from "../assets/logo_black.png";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (values, { setSubmitting }) => {
    try {
      const { email } = values;
      const response = await fetch("http://localhost:5555/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data = await response.json();
        setResetToken(data.reset_token);
        setError("");
        toast.success("An email with reset instructions has been sent", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setError("Email not found");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex
      align={{ base: "center", md: "stretch" }}
      flexDir={{ base: "column", md: "row-reverse" }}
      className="h-screen"
    >
      <Flex
        className="forgot-password"
        flexDir={"column"}
        w={{ base: "100%", md: "50%" }}
        p={4}
        maxW="lg"
        m="auto"
      >
        <Box className="forgot-password-form" p={6} borderRadius="md">
          <Image src={logo} />
          <Text as="h1" fontSize="lg" py={8}>
            Forgot Password
          </Text>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleForgotPassword}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <VStack spacing={4}>
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" />
                    <ErrorMessage name="email" component={FormErrorMessage} />
                  </FormControl>

                  {error && <Text color="red.500">{error}</Text>}
                  {resetToken && (
                    <Text color="green.500">
                      An email with reset instructions has been sent to{" "}
                      <strong>{values.email}</strong>.
                    </Text>
                  )}

                  <Button
                    w={"100%"}
                    type="submit"
                    bg={"#101f3c"}
                    _hover={{ bg: "101f3c" }}
                    color={"#fff"}
                    isLoading={isSubmitting}
                  >
                    Get reset link
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
          Get reset link <ArrowForwardIcon />
        </Box>
        <Image px={{ base: 2, md: 8 }} w={"400px"} />
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
