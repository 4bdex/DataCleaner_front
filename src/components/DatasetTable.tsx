import { useQuery } from "react-query";
import { getDataset } from "../api/dataset";
import { useUser } from "../contexts/userContext";
import {
  Alert,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import getDatasetColumns from "../utils/getDatasetColumns";

const DatasetTable = ({ datasetId }: { datasetId: string }) => {
  const { token } = useUser();
  console.log("dataset id to query", datasetId);

  const {
    data: dataset,
    isLoading,
    isError,
  } = useQuery({
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
    <>
      {isLoading && (
        <Alert>
          <Spinner /> Loading your dataset data
        </Alert>
      )}
      {isError && (
        <Alert>An Error occurred while loading the dataset data</Alert>
      )}
      {dataset && (
        <TableContainer>
          <Table
            sx={{ border: "2px solid grey" }}
            size={"lg"}
            variant="striped"
          >
            <Thead>
              <tr>
                {getDatasetColumns(dataset[0]).map((column) => (
                  <Th key={column}>{column}</Th>
                ))}
              </tr>
            </Thead>
            <Tbody>
              {dataset.map((obj: any, index: number) => (
                <Tr key={index}>
                  {Object.keys(obj).map((key) => (
                    <Td key={key}>{obj[key]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default DatasetTable;
