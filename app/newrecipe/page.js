"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
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
    },
  });
  const onSubmit = (data) => console.log(data);

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "ingredients",
    rules: {
      required: "Must have atleast one ingedient",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container h="100vh" bg="white">
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
          <FormLabel htmlFor="description">Description:</FormLabel>
          <Textarea
            placeholder="A delicious breakfast"
            id="description"
            {...register("description")}
          />
          <FormLabel htmlFor="ingredients">Ingredients:</FormLabel>
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
                <Button ml={2} onClick={() => remove(index)}>-</Button>
              </InputGroup>
            );
          })}
          <Button onClick={() => append({ amount: "", unit: "", name: "" })}>
            +
          </Button>
          {/* Method */}
          <FormLabel>Method:</FormLabel>
          <MethodStep></MethodStep>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <Button mt={4} isLoading={isSubmitting} type="submit">
            Save
          </Button>
        </FormControl>
      </Container>
    </form>
  );
}

const stepHeight = "80px";
function MethodStep({ stepNumber = 0 }) {
  return (
    <InputGroup>
      <InputLeftElement h={stepHeight}>Step {stepNumber}:</InputLeftElement>
      <Input h={stepHeight}></Input>
    </InputGroup>
  );
}
