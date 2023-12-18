import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Input,
  Select,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const RightSidebar = () => {
  return (
    <Flex
      rounded={"md"}
      as={"aside"}
      height={"100%"}
      width={"300px"}
      maxW={"30%"}
      overflow={"auto"}
      px={4}
      py={3}
    >
      <div>
        <Text>Cleaning Options:</Text>
        <Divider
          //   height={1}
          width={"100%"}
          rounded={"lg"}
          backgroundColor={"gray.300"}
          my={4}
        />
        <Flex direction={"column"} gap={3}>
          <Box>
            <Select placeholder="Cleaning option 1">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Checkbox my={3}>Check box</Checkbox>
            <Flex direction={"column"} gap={2}>
              <Text>Select Option: </Text>
              <Input size={"xs"} rounded={"md"} />
            </Flex>
          </Box>
        </Flex>
        <Flex my={8} direction={"column"} gap={3}>
          <Box>
            <Select placeholder="Cleaning option 1">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Checkbox my={3}>Check box</Checkbox>
            <Flex direction={"column"} gap={2}>
              <Text>Select Option: </Text>
              <Input size={"xs"} rounded={"md"} />
            </Flex>
          </Box>
        </Flex>
        <Flex direction={"column"} gap={3}>
          <Box>
            <Select placeholder="Cleaning option 1">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Checkbox my={3}>Check box</Checkbox>
            <Flex direction={"column"} gap={2}>
              <Text>Select Option: </Text>
              <Input size={"xs"} rounded={"md"} />
            </Flex>
          </Box>
        </Flex>
      </div>
    </Flex>
  );
};

export default RightSidebar;
