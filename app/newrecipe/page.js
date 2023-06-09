"use client";
import React from "react";
import ImageUpload from "@/components/recipeform/ImageUpload";
import { db } from "@/db";
import { useForm, useFieldArray } from "react-hook-form";
import useState from "react";
import {
  Box,
  Input,
  Image,
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
  VisuallyHidden,
  useToast,
} from "@chakra-ui/react";
const IMAGE =
  "https://images.pexels.com/photos/7627422/pexels-photo-7627422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const stepHeight = "80px";
const buttonWidth = "25px";

export default function Recipe() {
  // const [url, setUrl] = useState(
  //   "https://images.pexels.com/photos/7627422/pexels-photo-7627422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  // );
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      imgUrl: IMAGE,
      name: "",
      description: "",
      category: "",
      region: "",
      ingredients: [{ amount: "", unit: "", name: "" }],
      method: [{ step: "" }],
    },
  });
  //  const onSubmit = (data) => console.log(data);
  const onSubmit = (data) => saveRecipe(data);

  async function saveRecipe({
    imgUrl,
    recipeName,
    description,
    ingredients,
    method,
  }) {
    try {
      const id = await db.recipes.add({
        imgUrl: imgUrl,
        recipeName: recipeName,
        description: description,
        ingredients: ingredients,
        method: method,
      });
      // show toast for success or failure
      toast({
        title: `${recipeName} added successfully`,
        description: "",
        status: "success",
        duration: 4500,
        isClosable: true,
      });
      //reset the fields
      // alert(`${recipeName} added successfully with id ${id}`);
    } catch (error) {
      toast({
        title: `Failed to add ${recipeName}: ${error}`,
        description: "",
        status: "error",
        duration: 4500,
        isClosable: true,
      });
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxW="2xl" bg="white" mb={15}>
        <Heading w="100%" textAlign={"left"} fontWeight="normal" mb="2%">
          New Recipe
        </Heading>
        <FormControl isInvalid={errors.name}>
          {/*  */}
          <ImageUpload onUpload={(url) => setValue("imgUrl", url)} />
          <FormLabel htmlFor="recipeName">Recipe name:</FormLabel>
          <Input
            id="recipeName"
            placeholder="Egg on toast"
            {...register("recipeName", {
              required: "Recipe name is required",
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
          {/* Ingredients */}
          <FormLabel htmlFor="ingredients" mt={5}>
            Ingredients:
          </FormLabel>
          {/* use array split and join to manage the ingredients + unit for later processing (conversion) */}
          {fields.map((field, index) => {
            return (
              <InputGroup mb={2} id="ingredients" key={field.id}>
                <VisuallyHidden>
                  <FormLabel htmlFor="amount">Ingredient Amount</FormLabel>
                </VisuallyHidden>
                <Input
                  id="amount"
                  {...register(`ingredients.${index}.amount`)}
                  placeholder="amount"
                  borderRight="none"
                  borderRightRadius="0"
                ></Input>

                <VisuallyHidden>
                  <FormLabel htmlFor="name">Ingredient name</FormLabel>
                </VisuallyHidden>
                <Input
                  id="name"
                  {...register(`ingredients.${index}.name`)}
                  placeholder="name"
                  borderLeftRadius="0"
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
                  <FormLabel>{index + 1}</FormLabel>
                  {/* TODO: make the tesxt centered */}
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
              minW={"120px"}
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
