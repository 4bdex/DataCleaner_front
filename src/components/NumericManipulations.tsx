import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Heading,
} from "@chakra-ui/react";
import {
  DropNull,
  LimiteValCol,
  NumberReplacement,
  ReplaceByAverage,
  ReplaceByLogTransformation,
  ReplaceByMedian,
} from "./numeric-manipulations";

const NumericManipulations = ({
  datasetId,
  columns,
}: {
  datasetId: string;
  columns: string[];
}) => {
  return (
    <AccordionItem borderTopWidth={"3px"}>
      <h2>
        <AccordionButton px={0}>
          <Box as="span" flex="1" textAlign="left">
            <Heading size={"md"}>Numeric Manipulations</Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel px={0} pb={4}>
        <>
          <DropNull datasetId={datasetId} columns={columns} />
          <Divider my={3} />
          <LimiteValCol datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <NumberReplacement datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <ReplaceByAverage datasetId={datasetId} columns={columns} />
          <Divider my={3} />
          <ReplaceByMedian datasetId={datasetId} columns={columns} />

          <Divider my={3} />

          <ReplaceByLogTransformation datasetId={datasetId} columns={columns} />
        </>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default NumericManipulations;
