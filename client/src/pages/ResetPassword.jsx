import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage, VStack, Text } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordSchema = Yup.object().shape({
  token: Yup.string().required("Token is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPasswordForm = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { token, newPassword, confirmPassword } = values;
      const response = await fetch("http://localhost:5555/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, new_password: newPassword, confirm_password: confirmPassword }),
      });
      if (response.ok) {
        toast.success('Password has been reset successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
        history.push(`/${data.reset_token}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to reset password. Please try again.");
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
          initialValues={{ token: "", newPassword: "", confirmPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.token && touched.token}>
                  <FormLabel htmlFor="token">Token</FormLabel>
                  <Field as={Input} id="token" name="token" />
                  <ErrorMessage name="token" component={FormErrorMessage} />
                </FormControl>

            <FormControl isInvalid={errors.newPassword && touched.newPassword}>
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <Field as={Input} id="newPassword" name="newPassword" type="password" />
              <ErrorMessage name="newPassword" component={FormErrorMessage} />
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Field as={Input} id="confirmPassword" name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component={FormErrorMessage} />
            </FormControl>

            {error && <Text color="red.500">{error}</Text>}

            <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
              Submit
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  </Box>
</Box>
  );
};

export default ResetPasswordForm;