import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  useToast,
  Badge,
  Alert,
  Text,
} from "@chakra-ui/react";
import RightSidebar from "../components/RightSidebar";
import { useState } from "react";
import { useUser } from "../contexts/userContext";
import { getUserDatasets } from "../api/dataset";
import { useQuery } from "react-query";
import { TDataset } from "../types/Dataset";
import DatasetTable from "../components/DatasetTable";

const Dashboard = () => {
  // const location = useLocation();
  // const { dataset } = location.state;
  // console.log("dataset", dataset);
  const [showAnalyses, setShowAnalyses] = useState(false);
  const { token } = useUser();
  const toast = useToast();
  const { data: datasets, isLoading } = useQuery({
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
    onSuccess: (datasets) => {
      console.log("datasets", datasets);
      setSelectedDataset(datasets[0]);
    },
    refetchOnWindowFocus: false,
  });

  const [selectedDataset, setSelectedDataset] = useState<TDataset | null>(null);

  return (
    <Flex height={"calc(100vh - 74px)"} p={3} gap={4}>
      <Box overflow={"auto"} as="main" width={"70%"}>
        <Flex gap={4} flexWrap={"wrap"} alignItems={"center"}>
          {isLoading && <Alert>Loading your datasets list</Alert>}

          {selectedDataset ? (
            <Select
              width={"50%"}
              value={selectedDataset._id}
              onChange={(e) =>
                setSelectedDataset(
                  datasets.find(
                    (dataset: TDataset) => dataset._id == e.target.value
                  )
                )
              }
            >
              {datasets.map((dataset: TDataset) => (
                <option key={dataset._id} value={dataset._id}>
                  {dataset.dataset_name}
                </option>
              ))}
            </Select>
          ) : (
            <Select width={"50%"} isReadOnly value="default">
              <option value="default">...</option>
            </Select>
          )}

          {selectedDataset && (
            <Flex width={"30%"} gap={4} flexWrap={"wrap"}>
              <Badge px={2} py={1} borderRadius={"10px"}>
                Size: {selectedDataset.size}
              </Badge>
              <Badge px={2} py={1} borderRadius={"10px"}>
                Columns: {selectedDataset.columns}
              </Badge>
            </Flex>
          )}
        </Flex>
        <Box>
          <Tabs>
            <TabList>
              <Tab onClick={() => setShowAnalyses(false)}>Data</Tab>
              <Tab onClick={() => setShowAnalyses(true)}>Analyses</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {selectedDataset ? (
                  <DatasetTable datasetId={selectedDataset._id} />
                ) : (
                  <Alert>Please select a dataset first</Alert>
                )}
              </TabPanel>
              <TabPanel>
                <p>Analyses</p>
                {selectedDataset ? (
                  <DatasetTable datasetId={selectedDataset._id} />
                ) : (
                  <Alert>Please select a dataset first</Alert>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
      {selectedDataset?._id ? (
        <RightSidebar
          showAnalyses={showAnalyses}
          datasetId={selectedDataset._id}
        />
      ) : (
        <Text>No dataset selected</Text>
      )}
    </Flex>
  );
};

export default Dashboard;
