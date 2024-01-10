import {
  Alert,
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "../contexts/userContext";
import DatasetCard from "../components/DatasetCard";
import UploadDataset from "../components/UploadDataset";
import { useQuery } from "react-query";
import { getUserDatasets } from "../api/dataset";
import { TDataset } from "../types/Dataset";

const Datasets = () => {
  const toast = useToast();
  const { token } = useUser();

  const {
    data: datasets,
    isLoading: isLoadingDatasets,
    isRefetching,
  } = useQuery({
    queryKey: ["datasets"],
    queryFn: () => getUserDatasets({ token }),
    onError: (error) => {
      console.log("error fetching datasets", error);
      toast({
        title: "An error occurred while fetching your datasets",
        status: "error",
        duration: 2500,
      });
    },
  });
  if (isLoadingDatasets) {
    <Box p={3}>
      <Flex mb={5} justifyContent={"space-between"} alignItems={"center"}>
        <Heading>Datasets</Heading>
        <UploadDataset />
      </Flex>
      <Flex flexWrap={"wrap"} gap={3}>
        <Alert status="info">
          <Spinner />
          <Text>Loading your datasets</Text>
        </Alert>
      </Flex>
    </Box>;
  }

  return (
    <Box p={3}>
      <Flex mb={5} justifyContent={"space-between"} alignItems={"center"}>
        <Heading>Datasets</Heading>
        <UploadDataset />
      </Flex>
      <Flex flexWrap={"wrap"} gap={3}>
        {isRefetching && (
          <Alert status="info">
            <Spinner /> Refetching your datasets list...
          </Alert>
        )}
        {datasets?.length > 0 ? (
          datasets.map((dataset: TDataset) => (
            <DatasetCard key={dataset._id} dataset={dataset} />
          ))
        ) : (
          <Alert status="info">
            You have 0 datasets, try adding some by click the button 'Upload
            Dataset'
          </Alert>
        )}
      </Flex>
    </Box>
  );
};

export default Datasets;
