import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage, VStack, Text } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Confirm Password is required"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const [error, setError] = useState("");

  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      const { password } = values;
      const response = await fetch("http://localhost:5555/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setError("");
        toast.success('Password has been reset successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="reset-password" p={4} maxW="md" mx="auto">
      <Box className="reset-password-form" p={6} boxShadow="lg" borderRadius="md">
        <Text as="h1" fontSize="2xl" mb={4}>Reset Password</Text>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.password && touched.password}>
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <Field as={Input} id="password" name="password" type="password" />
                  <ErrorMessage name="password" component={FormErrorMessage} />
                </FormControl>

                <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword}>
                  <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                  <Field as={Input} id="confirmPassword" name="confirmPassword" type="password" />
                  <ErrorMessage name="confirmPassword" component={FormErrorMessage} />
                </FormControl>

                {error && <Text color="red.500">{error}</Text>}
                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  Reset Password
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetPassword;
