"use client";
import { Container, Heading, Text, Link } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Container>
      <Heading as="h1">Oops...</Heading>
      <Heading as="h2">That page cannot be found</Heading>
      <Text>
        Go back to the <Link href="/">homepage</Link>
      </Text>
    </Container>
  );
}
