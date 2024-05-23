import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useDisclosure,
  Stack,
  Image,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormErrorMessage,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import {
  paypalValidation,
  creditCardValidation,
  mpesaValidation,
} from "../utils/Schema";
import { PropTypes } from "prop-types";
import IMGL0721 from "../assets/IMGL0721.jpeg";
import IMGL0722 from "../assets/share_media.jpg";
import IMGL0723 from "../assets/volunteer.jpg";
import paypal from '../assets/pay-pal.png'
import mpesa from '../assets/m-pesa.png'
import creditcard from '../assets/credit-card.png'

function Donate({ onSubmit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeForm, setActiveForm] = useState(null);

  const handleSubmit = async (values, actions) => {
    console.log("Form values:", values);
    onSubmit(values);
    actions.resetForm();
    onClose();
  };

  const handleFormChange = (formType) => {
    setActiveForm(formType);
    onOpen();
  };

  return (
    <Flex my={8}  mx={"auto"} ml={'20px'} flexWrap="wrap" gap={8}>
      
      <Box
        borderRadius={"lg"}
        maxW="md"
        shadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
        }
      >
        <Box>
          <Image src={IMGL0721} alt="Donate today" borderRadius="lg" />
          <Stack mt="6" spacing="3" p={4}>
            <Heading size="md">Donate Today</Heading>
            <Text>
              Your donation fuels the dreams of Moringa School students,
              providing them with vital resources, support, and opportunities to
              excel in the tech industry. Every contribution, no matter the
              size, directly impacts their education, enabling them to acquire
              essential skills, access mentorship programs, and pursue their
              career aspirations with confidence.
            </Text>
            <Box>
              <Flex gap={4} align={'center'}>
                <Image
                  src={creditcard}
                  onClick={() => handleFormChange("creditCard")}
                  w={'100px'}
                  cursor={'pointer'}
                />
                <Image
                 src={mpesa}
                  onClick={() => handleFormChange("mpesa")}
                  w={'80px'}
                  cursor={'pointer'}
                />
                <Image
                src={paypal}
                  onClick={() => handleFormChange("paypal")}
                  cursor={'pointer'}
                  w={'100px'}
                />
              </Flex>

              <Modal isOpen={isOpen} onClose={onClose} alignItems={"center"}>
                <ModalOverlay />
                <ModalContent
                  bg={"#fff"}
                  color={"#101f3c"}
                  minH="auto"
                  display="flex"
                  justify="center"
                  py={10}
                >
                  <ModalHeader textAlign="center" color="#101f3c">
                    {activeForm === "creditCard"
                      ? "Credit Card Payment"
                      : activeForm === "mpesa"
                      ? "M-Pesa Payment"
                      : "PayPal Payment"}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Formik
                      initialValues={{
                        cardNumber: "",
                        expiryDate: "",
                        cvv: "",
                        mpesaNumber: "",
                        paypalEmail: "",
                        amount: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <Stack direction={"column"} spacing={8}>
                            {/* Credit Card Payment Form */}
                            {activeForm === "creditCard" && (
                              <>
                                {/* Credit card fields */}
                                <Field name="amount">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.amount &&
                                        form.touched.amount
                                      }
                                    >
                                      <NumberInput
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        value={field.value}
                                        onChange={(value) =>
                                          form.setFieldValue(field.name, value)
                                        }
                                      >
                                        <NumberInputField
                                          placeholder="Amount"
                                          {...field}
                                        />
                                      </NumberInput>

                                      <FormErrorMessage color="crimson">
                                        {form.errors.amount &&
                                          form.touched.amount &&
                                          form.errors.amount}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name="creditCardNumber">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.creditCardNumber &&
                                        form.touched.creditCardNumber
                                      }
                                    >
                                      <Input
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="Credit Card Number"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.creditCardNumber &&
                                          form.touched.creditCardNumber &&
                                          form.errors.creditCardNumber}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Flex gap={2}>
                                  <Field name="expiryDate">
                                    {({ field, form }) => (
                                      <FormControl
                                        isInvalid={
                                          form.errors.expiryDate &&
                                          form.touched.expiryDate
                                        }
                                      >
                                        <Input
                                          errorBorderColor="crimson"
                                          focusBorderColor={"#101f3c"}
                                          placeholder="MM/YY"
                                          {...field}
                                        />
                                        <FormErrorMessage color="crimson">
                                          {form.errors.expiryDate &&
                                            form.touched.expiryDate &&
                                            form.errors.expiryDate}
                                        </FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>
                                  <Field name="cvv">
                                    {({ field, form }) => (
                                      <FormControl
                                        isInvalid={
                                          form.errors.cvv && form.touched.cvv
                                        }
                                      >
                                        <Input
                                          errorBorderColor="crimson"
                                          focusBorderColor={"#101f3c"}
                                          placeholder="CVV"
                                          {...field}
                                        />
                                        <FormErrorMessage color="crimson">
                                          {form.errors.cvv &&
                                            form.touched.cvv &&
                                            form.errors.cvv}
                                        </FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>
                                </Flex>
                              </>
                            )}

                            {/* M-Pesa Payment Form */}
                            {activeForm === "mpesa" && (
                              <>
                                {/* M-Pesa fields */}
                                <Field name="amount">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.amount &&
                                        form.touched.amount
                                      }
                                    >
                                      <NumberInput
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        value={field.value}
                                        onChange={(value) =>
                                          form.setFieldValue(field.name, value)
                                        }
                                      >
                                        <NumberInputField
                                          placeholder="Amount"
                                          {...field}
                                        />
                                      </NumberInput>

                                      <FormErrorMessage color="crimson">
                                        {form.errors.amount &&
                                          form.touched.amount &&
                                          form.errors.amount}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name="mpesaNumber">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.mpesaNumber &&
                                        form.touched.mpesaNumber
                                      }
                                    >
                                      <Input
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="M-Pesa Number"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.mpesaNumber &&
                                          form.touched.mpesaNumber &&
                                          form.errors.mpesaNumber}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                              </>
                            )}

                            {/* PayPal Payment Form */}
                            {activeForm === "paypal" && (
                              <>
                                {/* PayPal fields */}
                                <Field name="amount">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.amount &&
                                        form.touched.amount
                                      }
                                    >
                                      <Input
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="Amount"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.amount &&
                                          form.touched.amount &&
                                          form.errors.amount}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name="paypalEmail">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.paypalEmail &&
                                        form.touched.paypalEmail
                                      }
                                    >
                                      <Input
                                        type="email"
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="PayPal Email"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.paypalEmail &&
                                          form.touched.paypalEmail &&
                                          form.errors.paypalEmail}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                              </>
                            )}

                            {/* Submit Button */}
                            <Button
                              alignSelf={"center"}
                              w={"150px"}
                              bg={"#fa510f"}
                              color={"#fff"}
                              type="submit"
                              variant={"ghost"}
                              _hover={{ background: "#fa510f" }}
                              isLoading={isSubmitting}
                            >
                              Pay Now
                            </Button>
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box
        borderRadius={"lg"}
        maxW="md"
        shadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
        }
      >
        <Box>
          <Image
            src={IMGL0722}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            boxSize={"100%"}
          />
          <Stack mt="6" spacing="3" p={4}>
            <Heading size="md">Share</Heading>
            <Text>
              By spreading the word about Moringa School and our mission, you're
              raising awareness about the importance of tech education and
              inspiring others to join our cause. Your advocacy not only
              encourages donations but also fosters a sense of community among
              fellow alumni and supporters.
            </Text>
          </Stack>
        </Box>
      </Box>
      <Box
        borderRadius={"lg"}
        maxW="md"
        shadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
        }
      >
        <Box>
          <Image
            src={IMGL0723}
            alt="volunteers"
            borderRadius="lg"
            boxSize={"100%"}
          />

          <Stack mt="6" spacing="3" p={4}>
            <Heading size="md">Volunteer</Heading>
            <Text>
              Your expertise, guidance, and mentorship provide students with
              invaluable insights, skills, and support as they navigate their
              educational and career journeys. By sharing your experiences,
              offering advice, and fostering meaningful connections, you empower
              students to overcome challenges, explore new opportunities, and
              achieve their full potential in the tech industry.
            </Text>
            <Button
              bg="#101f3c"
              color={"#fff"}
              _hover={{ bg: "#101f3c" }}
              width={"120px"}
            >
              Volunteer
            </Button>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}
Donate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Donate;
