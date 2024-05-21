import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage, VStack, Text } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast.success('You are registered, please login', {
          position: 'top-right',
          autoClose: 6000,
        });
        navigate("/login");
      } else {
        const errorData = await response.json();
        setSignupError(errorData.error || "Failed to signup. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSignupError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="login-signup" p={4} maxW="md" mx="auto">
      <Box className="signup-form" p={6} boxShadow="lg" borderRadius="md">
        <Text as="h1" fontSize="2xl" mb={4}>Signup</Text>
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
                  <Field as={Input} id="username" name="username" />
                  <ErrorMessage name="username" component={FormErrorMessage} />
                </FormControl>
                
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field as={Input} id="email" name="email" type="email" />
                  <ErrorMessage name="email" component={FormErrorMessage} />
                </FormControl>
                
                <FormControl isInvalid={errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field as={Input} id="password" name="password" type="password" />
                  <ErrorMessage name="password" component={FormErrorMessage} />
                </FormControl>

                {signupError && <Text color="red.500">{signupError}</Text>}

                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  Submit
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
        <Text mt={4}>
          Already have an account?{" "}
          <Link to="/login" className="login-link" style={{ color: "teal.500" }}>
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Signup;
