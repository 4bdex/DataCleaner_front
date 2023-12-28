import LeftSidebar from "../components/LeftSidebar";
import {
  Box,
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import RightSidebar from "../components/RightSidebar";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const location = useLocation();
  const { dataset } = location.state;
  console.log("dataset", dataset);
  const [showAnalyses, setShowAnalyses] = useState(false);
  return (
    <Flex height={"calc(100vh - 74px)"} p={3} gap={4}>
      {/* <LeftSidebar /> */}

      <Box overflow={"auto"} as="main" width={"70%"}>
        <Tabs>
          <TabList>
            <Tab onClick={() => setShowAnalyses(false)}>Data</Tab>
            <Tab onClick={() => setShowAnalyses(true)}>Analyses</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table
                  sx={{ border: "2px solid grey" }}
                  size={"lg"}
                  variant="striped"
                >
                  <Thead>
                    <Tr>
                      {Object.keys(dataset[0]).map((key) => (
                        <Th key={key}>{key}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {dataset.map(item =>)} */}
                    {dataset.map((obj: any, index) => (
                      <Tr key={index}>
                        {Object.keys(obj).map((key) => (
                          <Td key={key}>{obj[key]}</Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <p>Analyses</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <RightSidebar showAnalyses={showAnalyses} />
    </Flex>
  );
};

export default Dashboard;
