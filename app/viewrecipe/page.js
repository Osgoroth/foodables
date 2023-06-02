"use client";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Box,
  Container,
  Divider,
  Heading,
  AbsoluteCenter,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ViewRecipe() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("recipe"));

  const recipe = useLiveQuery(async () => {
    // Query Dexie API
    const recipe = await db.recipes.where("id").equals(id).toArray();

    //  return the result
    return recipe;
  }, [id]);

  return (
    //display the recipe
    <Container>
      {recipe?.map((result) => (
        <Box key={result.id}>
          <Heading as="h1" size="2xl">
            {result.recipeName}
          </Heading>
          <Heading as="h2" size="lg">
            Description
          </Heading>
          <Text>{result.description}</Text>
          <Heading as="h2" size="lg">
            Ingredients:
          </Heading>
          <ul>
            {result.ingredients.map((ingredient) => (
              <Ingredient key={ingredient.name} ingredient={ingredient} />
            ))}
          </ul>
          <Heading as="h2" size="lg">
            Method:
          </Heading>
          {result.method.map((method, index) => (
            <Method key={index} method={method} index={index} />
          ))}
        </Box>
      ))}
    </Container>
  );
}

function Ingredient({ key, ingredient }) {
  return (
    <li key={key}>
      {ingredient.amount} {ingredient.unit} {ingredient.name}
    </li>
  );
}

function Method({ key, method, index }) {
  return (
    <li key={key}>
      Step {index + 1}: {method.step}
    </li>
  );
}
