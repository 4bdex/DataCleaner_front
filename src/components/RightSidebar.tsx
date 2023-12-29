import {
  Accordion,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import TextManipulations from "./TextManipulations";
import NumericManipulations from "./NumericManipulations";

const RightSidebar = ({
  showAnalyses,
  datasetId,
}: {
  showAnalyses: boolean;
  datasetId: string | undefined;
}) => {
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
        <Heading>{showAnalyses ? "Create analyses" : "Clean Data"}</Heading>
        <Divider
          //   height={1}
          width={"100%"}
          rounded={"lg"}
          backgroundColor={"gray.300"}
          my={4}
          mb={10}
        />
        {datasetId ? (
          showAnalyses ? (
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
              <Accordion allowToggle>
                <TextManipulations datasetId={datasetId} />
                <NumericManipulations />
              </Accordion>
            </Flex>
          )
        ) : showAnalyses ? (
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
          <Text>No dataset selected</Text>
        )}
      </Box>
    </Flex>
  );
};

export default RightSidebar;
