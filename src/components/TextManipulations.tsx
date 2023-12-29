import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useUser } from "../contexts/userContext";
import { getDataset } from "../api/dataset";
import { useQuery } from "react-query";
import StringReplacement from "./text-manipulations/StringReplacement";
import getDatasetColumns from "../utils/getDatasetColumns";
import RemoveSpecialCharacters from "./text-manipulations/RemoveSpecialCharacters";
import CleanWithCustomPatterns from "./text-manipulations/CleanWithCustomPatterns";
import HandleEncodingIssues from "./text-manipulations/HandleEncodingIssues";
import LemmatizeColumn from "./text-manipulations/LemmatizeColumn";
import RemoveStopWords from "./text-manipulations/RemoveStopWords";
import RemoveWhitespaces from "./text-manipulations/RemoveWhitespaces";
import Stemming from "./text-manipulations/Stemming";
import TextFromHTML from "./text-manipulations/TextFromHTML";
import TokenizeColumn from "./text-manipulations/TokenizeColumn";
import WordEmbedding from "./text-manipulations/WordEmbedding";

const TextManipulations = ({ datasetId }: { datasetId: string }) => {
  const { token } = useUser();
  const { data: dataset } = useQuery({
    queryKey: ["datasets", datasetId],
    queryFn: () => getDataset({ datasetId, token }),
    onSuccess: (data) => {
      console.log("dataset data", data);
      console.log("dataset data 0", data[0]);
      Object.keys(data[0]).forEach((key) => {
        console.log("key", key);
      });
    },
    onError: (error) => {
      console.log(`error getting dataset data of id = ${datasetId}`, error);
    },
  });
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
        {dataset ? (
          <>
            <StringReplacement
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />
            <CleanWithCustomPatterns
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <HandleEncodingIssues
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <LemmatizeColumn
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <RemoveSpecialCharacters
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <RemoveStopWords
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <RemoveWhitespaces
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <Stemming
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <TextFromHTML
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <TokenizeColumn
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
            <Divider my={3} />

            <WordEmbedding
              datasetId={datasetId}
              columns={getDatasetColumns(dataset[0])}
            />
          </>
        ) : (
          <Text>No dataset selected</Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TextManipulations;
