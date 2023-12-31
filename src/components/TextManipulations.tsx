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
  CleanWithCustomPatterns,
  HandleEncodingIssues,
  LemmatizeColumn,
  RemoveSpecialCharacters,
  RemoveStopWords,
  RemoveWhitespaces,
  Stemming,
  StringReplacement,
  TextFromHTML,
  TokenizeColumn,
  WordEmbedding,
} from "./text-manipulations";

const TextManipulations = ({
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
            <Heading size={"md"}>Text Manipulations</Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel px={0} pb={4}>
        <>
          <StringReplacement datasetId={datasetId} columns={columns} />
          <Divider my={3} />
          <CleanWithCustomPatterns datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <HandleEncodingIssues datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <LemmatizeColumn datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <RemoveSpecialCharacters datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <RemoveStopWords datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <RemoveWhitespaces datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <Stemming datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <TextFromHTML datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <TokenizeColumn datasetId={datasetId} columns={columns} />
          <Divider my={3} />

          <WordEmbedding datasetId={datasetId} columns={columns} />
        </>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TextManipulations;
