import {
  Flex,
  Box,
  Image,
  Center,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";



export default function ImageUpload({ url: propUrl, onUpload }) {
  const [url, setUrl] = useState(propUrl);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleChange(e) {
    setUrl(e.target.value);
  }

  return (
    <Flex justify="center" my={4} position="relative">
      <Image
        src={url}
        alt="recipe image"
        boxSize={["150px", "250px"]}
        borderRadius={10}
        objectFit={"cover"}
      />

      <AddIcon
        as="button"
        _hover={{ color: "white" }}
        transition="color 0.3s ease-out"
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="gray.500"
        boxSize={["75px", "125px"]}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload an Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {url}
            <FormLabel>Image URL</FormLabel>
            <Input
              onChange={(e) => {
                e.preventDefault();
                setUrl(e.target.value);
              }}
            />

            {/* <FormControl mt={4}>
                <FormLabel>File on disk</FormLabel>
                <Input placeholder="..." />
              </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              form="imageUpload"
              onClick={() => {
                onUpload(url);
                onClose();
              }}
            >
              Upload
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
