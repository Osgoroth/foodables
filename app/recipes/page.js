"use client";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import RecipeCard from "@/components/RecipeCard";

export default function Recipes() {
  const recipes = useLiveQuery(() => db.recipes.toArray());

  return (
    <SimpleGrid columns={[2, null, 4, 5, 7]} spacing={2.5} m={5}>
      {recipes?.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          imgUrl={recipe.imgUrl}
          recipename={recipe.recipeName}
          id={recipe.id}
        />
      ))}
    </SimpleGrid>
  );
}
