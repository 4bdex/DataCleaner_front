import { CloseIcon } from "@chakra-ui/icons";
import { Button, Card, Divider, Flex, Text, WrapItem } from "@chakra-ui/react";
import React from "react";

const LeftSidebar = () => {
  return (
    <Flex
      boxShadow="outline"
      rounded={"md"}
      as={"aside"}
      direction={"column"}
      justify={"space-between"}
      height={"100%"}
      width={"400px"}
      maxW={"30%"}
      overflow={"auto"}
      px={4}
      py={3}
    >
      <div>
        <Text>Changes Made:</Text>
        <Divider
          //   height={1}
          width={"100%"}
          rounded={"lg"}
          backgroundColor={"gray.300"}
          my={4}
        />
        <Flex direction={"column"} gap={3}>
          <Button
            justifyContent={"space-between"}
            rightIcon={<CloseIcon />}
            colorScheme="gray"
            variant="outline"
          >
            Change 1
          </Button>
          <Button
            justifyContent={"space-between"}
            rightIcon={<CloseIcon />}
            colorScheme="gray"
            variant="outline"
          >
            Change 2
          </Button>
        </Flex>
      </div>
      <Flex gap={3}>
        <WrapItem>
          <Button colorScheme="yellow">Discard Changes</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="green">Save</Button>
        </WrapItem>
      </Flex>
    </Flex>
  );
};

export default LeftSidebar;
