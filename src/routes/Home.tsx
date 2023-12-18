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
} from "@chakra-ui/react";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
  return (
    <Flex height={"calc(100vh - 74px)"} p={3} gap={4}>
      <LeftSidebar />
      <Box as="main" flexGrow={1}>
        <Flex gap={4}>
          <Button flex={1} colorScheme="gray">
            Clean numeric values
          </Button>
          <Button flex={1} colorScheme="gray">
            Clean textual values
          </Button>
          <Button flex={1} colorScheme="gray">
            Clean date values
          </Button>
        </Flex>
        <Text mt={4} mb={3}>
          Dataset table:
        </Text>
        <TableContainer>
          <Table size={"lg"} variant="simple">
            <Thead>
              <Tr>
                <Th>Column</Th>
                <Th>Column</Th>
                <Th>Column</Th>
                <Th>Column</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
              </Tr>
              <Tr>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
              </Tr>
              <Tr>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
              </Tr>
              <Tr>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
              </Tr>
              <Tr>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
                <Td>column data</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <RightSidebar />
    </Flex>
  );
};

export default Home;
