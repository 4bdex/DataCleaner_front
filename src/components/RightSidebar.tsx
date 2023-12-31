import { Accordion, Box, Divider, Flex, Heading } from "@chakra-ui/react";
import TextManipulations from "./TextManipulations";
import NumericManipulations from "./NumericManipulations";
import getDatasetColumns from "../utils/getDatasetColumns";
import { useUser } from "../contexts/userContext";
import { useQuery } from "react-query";
import { getDataset } from "../api/dataset";
import DataVisualizations from "./DataVisualizations";

const RightSidebar = ({
  showAnalyses,
  datasetId,
}: {
  showAnalyses: boolean;
  datasetId: string;
}) => {
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
  if (!dataset) {
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
          <Heading>No dataset selected</Heading>
          <Divider
            //   height={1}
            width={"100%"}
            rounded={"lg"}
            backgroundColor={"gray.300"}
            my={4}
            mb={10}
          />
        </Box>
      </Flex>
    );
  }
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
        {showAnalyses ? (
          <DataVisualizations
            datasetId={datasetId}
            columns={getDatasetColumns(dataset[0])}
          />
        ) : (
          <Flex direction={"column"} gap={3}>
            <Accordion allowToggle>
              <TextManipulations
                columns={getDatasetColumns(dataset[0])}
                datasetId={datasetId}
              />
              <NumericManipulations
                columns={getDatasetColumns(dataset[0])}
                datasetId={datasetId}
              />
            </Accordion>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default RightSidebar;
