"use client";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import RecipeCard from "@/components/RecipeCard";

export default function Recipes() {
  const recipes = useLiveQuery(() => db.recipes.toArray());

  return (
    <SimpleGrid minChildWidth="120px" spacing="15px" m={5}>
      {recipes?.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipename={recipe.recipeName}
          id={recipe.id}
        />
      ))}
    </SimpleGrid>
  );
}
