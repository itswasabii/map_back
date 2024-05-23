import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postValidation } from "../utils/Schema";
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
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage
} from "@chakra-ui/react";

function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = async (event, { setSubmitting }) => {
    event.preventDefault(); // Prevent the default form submission
    
    try {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("media", mediaFile);
  
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSubmitting(false); // Reset submitting state regardless of success or failure
    }
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
      <Modal
        size={{ base: "sm", md: "2xl" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ content: "" }}
              validationSchema={postValidation}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
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
                    <ErrorMessage as={FormErrorMessage} name="content" />
                  </FormControl>
                  <FormControl>
                    <Text mt={6}>Media</Text>
                    <Input
                      id="media"
                      name="media"
                      type="file"
                      accept="image/*,video/*"
                      onChange={(event) =>
                        setMediaFile(event.target.files[0])
                      }
                    />
                  </FormControl>
                  <Button
  type="submit"
  onClick={(event) => handleSubmit(event, { setSubmitting: () => {} })} 
  mt={4}
  bg="#101F3C"
  _hover={{ bg: "#101f3c" }}
  color="white"
  fontWeight="bold"
  px={4}
  py={2}
  rounded="md"
  w={"100%"}
  isLoading={isSubmitting}
  disabled={isSubmitting} // Disable the button while submitting
>
  {isSubmitting ? "Creating..." : "Create Post"}
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
