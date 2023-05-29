"use client";
import { Container, Center } from "@chakra-ui/react";
import "./globals.css";
import Navbuttons from "@/components/navbuttons";

export default function Home() {
  return (
    <Center h="calc(100vh - 75px)">
      <Navbuttons />
    </Center>
  );
}
