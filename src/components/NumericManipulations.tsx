import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

const NumericManipulations = () => {
  return (
    <AccordionItem borderTopWidth={"3px"} borderBottomWidth={"3px"}>
      <h2>
        <AccordionButton px={0}>
          <Box as="span" flex="1" textAlign="left">
            <Heading size={"md"}>Numeric Manipulations</Heading>
          </Box>

          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel px={0} pb={4}>
        <Heading size={"md"}>Custom formula</Heading>
        <Text>
          Define a new column using a spark sql expression to query data in the
          current dateframe
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default NumericManipulations;
