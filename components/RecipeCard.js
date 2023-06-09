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
const cardHeight = [175, 225];
const cardWidth = [135, 200, 175];
const IMAGE =
  "https://images.pexels.com/photos/7627422/pexels-photo-7627422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export default function RecipeCard({ imgUrl, recipename, id }) {
  const cardStyles = {
    bg: useColorModeValue("white", "gray.800"),
    borderWidth: "1px",
    rounded: "lg",
    shadow: "lg",
    position: "relative",
    ":hover": {},
  };
  return (
    <LinkBox
      as={NextLink}
      href={`/recipepage?recipe=${id}`}
      sx={cardStyles}
      w={cardWidth}
      h={cardHeight}
    >
      <Image
        src={imgUrl}
        alt={`Picture of ${recipename}`}
        boxSize={cardWidth}
        roundedTop="lg"
        objectFit="cover"
      />

      <Box p="3" h={"50px"}>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            // fontSize="md"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            fontSize={[12, 18]}
          >
            {recipename}
          </Box>
        </Flex>
      </Box>
    </LinkBox>
  );
}
