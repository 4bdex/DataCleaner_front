import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const RightSidebar = ({ showAnalyses }: { showAnalyses: boolean }) => {
  return (
    <Flex
      rounded={"md"}
      as={"aside"}
      height={"100%"}
      width={"30%"}
      // flexBasis={"300px"}
      flexGrow={"2"}
      // flexShrink={"1"}
      overflow={"auto"}
      px={4}
      py={3}
    >
      <Box height={"100%"} width={"100%"}>
        <Heading>{showAnalyses ? "Create analyses" : "Add Transform"}</Heading>
        <Divider
          //   height={1}
          width={"100%"}
          rounded={"lg"}
          backgroundColor={"gray.300"}
          my={4}
          mb={10}
        />
        {showAnalyses ? (
          <Flex
            height={"100%"}
            as={"form"}
            flexDirection={"column"}
            // justifyContent={"space-between"}
          >
            <div>
              <FormControl my={3}>
                <FormLabel>Analysis Type</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Histogram</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <FormHelperText>
                  A limit of 20,000 rows is used for this analysis
                </FormHelperText>
              </FormControl>
              <FormControl my={3}>
                <FormLabel>Analysis name</FormLabel>
                <Input value={"Untitled"} />
              </FormControl>
              <FormControl my={3}>
                <FormLabel>X axis</FormLabel>
                <Select
                  defaultValue={"screen-size"}
                  placeholder="Select option"
                >
                  <option value="screen-size">ScreenSize</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl my={3}>
                <FormLabel>Color by</FormLabel>
                <Select placeholder="Select">
                  <option value="screen-size">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
            </div>

            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Button variant="ghost">Clear</Button>
              <Button colorScheme="green" type="submit">
                Add
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex direction={"column"} gap={3}>
            <Box>
              <Text fontSize="md" mb={3}>
                Custom
              </Text>
              <Heading size={"md"}>Custom formula</Heading>
              <Text>
                Define a new column using a spark sql expression to query data
                in the current dateframe
              </Text>
            </Box>
            <Box>
              <Heading size={"md"}>Custom transform</Heading>
              <Text>
                Use Psypark, pandas or psypark (sql), to define custom
                transformations
              </Text>
            </Box>
            <Box>
              <Text fontSize="md" mb={3}>
                Amazon ai service
              </Text>
              <Heading size={"md"}>Transforms for amazon personalize</Heading>
              <Text>
                Transform your dataset for amazon personalize use cases
              </Text>
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default RightSidebar;
