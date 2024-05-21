import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage, VStack, Text, Link } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link as RouterLink } from "react-router-dom";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

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
        setEmail(email);
        toast.success('An email with reset instructions has been sent', {
          position: 'top-right',
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
    <Box className="forgot-password" p={4} maxW="md" mx="auto">
      <Box className="forgot-password-form" p={6} boxShadow="lg" borderRadius="md">
        <Text as="h1" fontSize="2xl" mb={4}>Forgot Password</Text>
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
                    An email with reset instructions has been sent to <strong>{email}</strong>.
                  </Text>
                )}

                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  Submit
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
        <Text mt={4}>
          Proceed to{" "}
          <Link as={RouterLink} to="/reset-password" color="teal.500">
            Reset Password
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default ForgotPassword;