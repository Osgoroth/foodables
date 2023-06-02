import {
  Link,
  Box,
  Flex,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Card,
  CardBody,
  LinkBox,
} from "@chakra-ui/react";

import NextLink from "next/link";

const IMAGE =
  "https://images.pexels.com/photos/7627422/pexels-photo-7627422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export default function RecipeCard({ recipename, id }) {
  const cardStyles = {
    bg: useColorModeValue("white", "gray.800"),
    minW: "120px",
    maxW: "250px",
    borderWidth: "1px",
    rounded: "lg",
    shadow: "lg",
    position: "relative",
    ":hover": {},
  };
  return (
    <LinkBox as={NextLink} href={`/viewrecipe?recipe=${id}`} sx={cardStyles}>
      <Image src={IMAGE} alt={`Picture of ${recipename}`} roundedTop="lg" />

      <Box p="3">
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="md"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {recipename}
          </Box>
        </Flex>
      </Box>
    </LinkBox>
  );
}

