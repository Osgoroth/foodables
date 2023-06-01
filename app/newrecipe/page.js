"use client";
import React from "react";
import { db } from "@/db";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Box,
  Input,
  InputLeftElement,
  Heading,
  FormLabel,
  FormControl,
  Container,
  InputGroup,
  Button,
  Textarea,
  FormErrorMessage,
  Flex,
  Spacer,
} from "@chakra-ui/react";

export default function Recipe() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ingredients: [{ amount: "", unit: "", name: "" }],
      method: [{ step: "" }],
    },
  });
  // const onSubmit = (data) => console.log(data);
  const onSubmit = (data) => saveRecipe(data);

  async function saveRecipe({ recipeName, description, ingredients, method }) {
    console.log(recipeName);
    try {
      const id = await db.recipes.add({
        recipeName: recipeName,
        description: description,
        ingredients: ingredients,
        method: method,
      });
      alert(`${recipeName} added successfully with id ${id}`);
    } catch (error) {
      alert(`Failed to add ${data.recipeName}: ${error}`);
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
    rules: {
      required: "Must have atleast one ingedient",
    },
  });

  const {
    fields: methodFields,
    append: methodAppend,
    remove: methodRemove,
  } = useFieldArray({
    control,
    name: "method",
    rules: {
      required: "Must have atleast one step",
    },
  });

  const stepHeight = "80px";
  const buttonWidth = "25px";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxW="2xl" bg="white" mb={15}>
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          New Recipe
        </Heading>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="recipeName">Recipe name:</FormLabel>
          <Input
            id="recipeName"
            placeholder="Egg on toast"
            {...register("recipeName", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <p>{errors.recipeName?.message}</p>
          <FormLabel htmlFor="description">Description:</FormLabel>
          <Textarea
            placeholder="A delicious breakfast"
            id="description"
            {...register("description")}
          />
          <FormLabel htmlFor="ingredients" mt={5}>
            Ingredients:
          </FormLabel>
          {/* Ingredients */}
          {fields.map((field, index) => {
            return (
              <InputGroup mb={2} id="ingredients" key={field.id}>
                {/* TODO: add labels for accessibility but visually hidden */}
                <Input
                  {...register(`ingredients.${index}.amount`)}
                  placeholder="amount"
                  borderRight="none"
                  borderRightRadius="0"
                ></Input>
                <Input
                  {...register(`ingredients.${index}.unit`)}
                  placeholder="Unit"
                  borderRadius="0"
                ></Input>
                <Input
                  {...register(`ingredients.${index}.name`)}
                  placeholder="Name"
                  borderLeftRadius="0"
                  borderLeft="none"
                ></Input>

                <Button ml={2} onClick={() => remove(index)} colorScheme="red">
                  -
                </Button>
              </InputGroup>
            );
          })}
          <Flex>
            <Spacer />
            <Button
              onClick={() => append({ amount: "", unit: "", name: "" })}
              colorScheme="green"
              w={buttonWidth}
            >
              +
            </Button>
          </Flex>
          {/* Method */}
          <FormLabel>Method:</FormLabel>
          {methodFields.map((field, index) => {
            return (
              <InputGroup key={field.id}>
                <Flex
                  w={"100px"}
                  h={stepHeight}
                  bg={"gray.100"}
                  borderLeftRadius={5}
                  align="center"
                  justify={"center"}
                >
                  <FormLabel>Step {index + 1}:</FormLabel>
                </Flex>
                {/* TODO: either change the size of the labels to match or make it a fixed size */}
                <Textarea
                  mb={2}
                  type="text"
                  rows="5"
                  resize={"none"}
                  h={stepHeight}
                  {...register(`method.${index}.step`)}
                  borderRadius="0"
                />
                <Button
                  borderLeftRadius="0"
                  h={stepHeight}
                  w={buttonWidth}
                  onClick={() => methodRemove(index)}
                  colorScheme="red"
                >
                  -
                </Button>
              </InputGroup>
            );
          })}
          <Flex>
            <Spacer />
            <Button
              onClick={() => methodAppend()}
              colorScheme="green"
              w={buttonWidth}
            >
              +
            </Button>
          </Flex>

          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <Flex>
            <Spacer />
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="whatsapp"
              size={"lg"}
              w={"15vw"}
            >
              Save
            </Button>
            <Spacer />
          </Flex>
        </FormControl>
      </Container>
    </form>
  );
}
