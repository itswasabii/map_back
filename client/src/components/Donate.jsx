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
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  EmailIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import IMGL0721 from "../assets/IMGL0721.jpeg";
import IMGL0722 from "../assets/share_media.jpg";
import IMGL0723 from "../assets/volunteer.jpg";
import { Field, Form, Formik } from "formik";
import {
  paypalValidation,
  creditCardValidation,
  mpesaValidation,
} from "../utils/Schema";

function Donate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeForm, setActiveForm] = useState(null);

  const handleSubmit = async (values, actions) => {
    console.log("Form values:", values);
    actions.resetForm();
    onClose();
  };

  const handleFormChange = (formType) => {
    setActiveForm(formType);
    onOpen();
  };
  return (
    <Flex
      my={8}
      ml={{ base: "2px", md: "50px", lg: "70px", xl: "100px" }}
      mx={"auto"}
      flexWrap="wrap"
      gap={8}
    >
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
            {/* payment modals */}
            <Box>
              <ButtonGroup>
                <Button
                  bg="#101f3c"
                  color={"#fff"}
                  _hover={{ bg: "#101f3c" }}
                  onClick={() => handleFormChange("creditCard")}
                >
                  Credit Card
                </Button>
                <Button
                  bg="#101f3c"
                  color={"#fff"}
                  _hover={{ bg: "#101f3c" }}
                  onClick={() => handleFormChange("mpesa")}
                >
                  M-Pesa
                </Button>
                <Button
                  bg="#101f3c"
                  color={"#fff"}
                  _hover={{ bg: "#101f3c" }}
                  onClick={() => handleFormChange("paypal")}
                >
                  PayPal
                </Button>
              </ButtonGroup>

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
                      validationSchema={
                        activeForm === "creditCard"
                          ? creditCardValidation
                          : activeForm === "mpesa"
                          ? mpesaValidation
                          : paypalValidation
                      }
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
                                        form.errors.username &&
                                        form.touched.username
                                      }
                                    >
                                      <Input
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="amount"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.username &&
                                          form.touched.username &&
                                          form.errors.username}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name="creditCardNumber">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.username &&
                                        form.touched.username
                                      }
                                    >
                                      <Input
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="account number"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.username &&
                                          form.touched.username &&
                                          form.errors.username}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Flex gap={2}>
                                  <Field name="expirationDate">
                                    {({ field, form }) => (
                                      <FormControl
                                        isInvalid={
                                          form.errors.username &&
                                          form.touched.username
                                        }
                                      >
                                        <Input
                                          type="year"
                                          errorBorderColor="crimson"
                                          focusBorderColor={"#101f3c"}
                                          placeholder="expiration"
                                          {...field}
                                        />
                                        <FormErrorMessage color="crimson">
                                          {form.errors.username &&
                                            form.touched.username &&
                                            form.errors.username}
                                        </FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>
                                  <Field name="cvv">
                                    {({ field, form }) => (
                                      <FormControl
                                        isInvalid={
                                          form.errors.username &&
                                          form.touched.username
                                        }
                                      >
                                        <Input
                                          errorBorderColor="crimson"
                                          focusBorderColor={"#101f3c"}
                                          placeholder="cvv"
                                          {...field}
                                        />
                                        <FormErrorMessage color="crimson">
                                          {form.errors.username &&
                                            form.touched.username &&
                                            form.errors.username}
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
                                        form.errors.username &&
                                        form.touched.username
                                      }
                                    >
                                      <NumberInput
                                        errorBorderColor="crimson"
                                        focusBorderColor="#101f3c"
                                        value={field.value}
                                        onChange={(value) =>
                                          form.setFieldValue(field.name, value)
                                        }
                                      >
                                        <NumberInputField
                                          placeholder="amount"
                                          {...field}
                                        />
                                      </NumberInput>

                                      <FormErrorMessage color="crimson">
                                        {form.errors.username &&
                                          form.touched.username &&
                                          form.errors.username}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name="phoneNumber">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.username &&
                                        form.touched.username
                                      }
                                    >
                                      <Input
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="mobile number"
                                        type="numeric"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.username &&
                                          form.touched.username &&
                                          form.errors.username}
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
                                        form.errors.username &&
                                        form.touched.username
                                      }
                                    >
                                      <Input
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="amount"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.username &&
                                          form.touched.username &&
                                          form.errors.username}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name="email">
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.username &&
                                        form.touched.username
                                      }
                                    >
                                      <Input
                                        type="email"
                                        errorBorderColor="crimson"
                                        focusBorderColor={"#101f3c"}
                                        placeholder="email"
                                        {...field}
                                      />
                                      <FormErrorMessage color="crimson">
                                        {form.errors.username &&
                                          form.touched.username &&
                                          form.errors.username}
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

export default Donate;
