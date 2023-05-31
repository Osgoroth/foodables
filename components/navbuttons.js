"use client";

import { Button, VStack, Link, textDecoration } from "@chakra-ui/react";
import NextLink from "next/link";

const buttonHeight = "50px";
const buttonWidth = "175px";

export default function Navbuttons() {
  return (
    <VStack spacing="0">
      <Button
        h={buttonHeight}
        w={buttonWidth}
        colorScheme="teal"
        borderBottomRadius="0"
      >
        <Link as={NextLink} _hover={"textDecoration=none"} href="/newrecipe">
          New Recipe
        </Link>
      </Button>
      <Button
        w={buttonWidth}
        h={buttonHeight}
        colorScheme="teal"
        borderRadius="0"
      >
        View Recipes
      </Button>
      <Button
        w={buttonWidth}
        h={buttonHeight}
        colorScheme="teal"
        borderTopRadius="0"
      >
        Random Recipe
      </Button>
    </VStack>
  );
}

//TODO: only show these buttons on mobile
