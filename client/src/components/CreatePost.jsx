import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postValidation } from "../utils/Schema";

function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filename, setFilename] = useState(null);

  const initialValues = {
    category: "",
    content: "",
    userId: "",
    postId:"",
    cohortId: "",
    media: "",
  };

  const handleSubmit = (values, actions) => {
    // actions.preventDefault();
    console.log(values);
    // Handle form submission
    actions.resetForm();
  };

  return (
    <>
      <Flex
        align={"center"}
        bg={"#EDF2F7"}
        borderRadius={"md"}
        p={2}
        cursor={"pointer"}
        gap={2}
        onClick={onOpen}
      >
        <Tooltip hasArrow label="create post" placement="top">
          <AddIcon />
        </Tooltip>
        <Text display={{ base: "none", md: "inline" }}>create post</Text>
      </Flex>
      <Modal size={{ base: "sm", md: "2xl" }} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={postValidation}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <FormControl>
                    <FormLabel mt={6} htmlFor="category">
                      Category
                    </FormLabel>
                    <Field as={Select} id="category" name="category">
                      <option value="">Select category</option>
                      <option value="General">General</option>
                      <option value="Tech News">Tech News</option>
                      <option value="Succes Story">Succes Story</option>
                    </Field>
                    <Text color="red.500">
                      <ErrorMessage name="category" as={FormErrorMessage} />
                    </Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={6} htmlFor="content">
                      Post ID
                    </FormLabel>
                    <Field
                      as={Input}
                      id="postId"
                      errorBorderColor="red.500"
                      name="postId"
                    />
                    <Text color="red.500">
                      <ErrorMessage as={FormErrorMessage} name="postId" />
                    </Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={6} htmlFor="content">
                      Content
                    </FormLabel>
                    <Field
                      as={Textarea}
                      id="content"
                      errorBorderColor="red.500"
                      name="content"
                    />
                    <Text color="red.500">
                      <ErrorMessage as={FormErrorMessage} name="content" />
                    </Text>
                  </FormControl>

                  <FormControl>
                    <FormLabel mt={6} htmlFor="userId">
                      User ID
                    </FormLabel>
                    <Field as={Input} id="userId" name="userId" />
                    <Text color="red.500">
                      <ErrorMessage
                        errorBorderColor="crimson"
                        name="userId"
                        as={FormErrorMessage}
                      />
                    </Text>
                  </FormControl>

                  <FormControl>
                    <FormLabel mt={6} htmlFor="cohortId">
                      Cohort ID
                    </FormLabel>
                    <Field as={Input} id="cohortId" name="cohortId" />
                    <Text color="red.500">
                      <ErrorMessage name="cohortId" as={FormErrorMessage} />
                    </Text>
                  </FormControl>

                  <FormControl>
                    <Text mt={6}>Media</Text>
                    <FormLabel
                      htmlFor="media"
                      className="flex items-center px-4 py-2 font-bold text-white h-[auto] rounded cursor-pointer w-[100%] border-dashed border-2 border-[#cae5ff] bg-[#EDF2F7]"
                    >
                      <Flex
                        color={"#101f3c"}
                        flexDir={"column"}
                        gap={2}
                        align={"center"}
                        mx={"auto"}
                      >
                        <AddIcon alignSelf={"center"} />
                        <Text>Choose file</Text>
                      </Flex>
                    </FormLabel>
                    <Input
                      id="media"
                      name="media"
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        if (file) {
                          setFieldValue("media", file);
                          setFilename(file.name);
                        }
                      }}
                    />
                    <ErrorMessage name="media" as={FormErrorMessage} />
                  </FormControl>
                  <Text as={'sup'}>{filename}</Text>

                  <Button
                    type="submit"
                    mt={4}
                    bg="#101F3C"
                    _hover={{ bg: "#101f3c" }}
                    color="white"
                    fontWeight="bold"
                    px={4}
                    py={2}
                    rounded="md"
                    w={"100%"}
                  >
                    Create Post
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
