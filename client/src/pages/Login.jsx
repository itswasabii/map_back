import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage, VStack, Text } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const history = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const { username, password } = values;
      const response = await fetch("http://localhost:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        response.json()
        .then(data => {
            console.log(data.message)
            history("/")
            toast.success('Welcome Back!!', {
              position: 'top-right',
              autoClose: 3000,
            });
        })
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="login-signup" p={4} maxW="md" mx="auto">
      <Box className="login-form" p={6} boxShadow="lg" borderRadius="md">
        <Text as="h1" fontSize="2xl" mb={4}>Login</Text>
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
                  <ErrorMessage name="username" component={FormErrorMessage} />
                </FormControl>
                
                <FormControl isInvalid={errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field as={Input} id="password" name="password" type="password" />
                  <ErrorMessage name="password" component={FormErrorMessage} />
                </FormControl>

                {loginError && <Text color="red.500">{loginError}</Text>}

                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  Login
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
        <Text mt={4}>
          Don't have an account?{" "}
          <Link to="/signup" className="login-link" style={{ color: "teal.500" }}>
            Signup
          </Link>
        </Text>
        <Text>
          <Link to="/forgot-password" className="login-link" style={{ color: "teal.500" }}>
            Forgot password?
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;