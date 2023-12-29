import {
  Button,
  Flex,
  Heading,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { tokenizeColumnData } from "../../api/text";

type TokenizeColumnProps = {
  columns: string[];
  datasetId: string;
};
const TokenizeColumn = ({ columns, datasetId }: TokenizeColumnProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      tokenizeColumnData({
        column: formData.selectedColumn,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("tokenize column success", data);
      toast({
        title: "Column data tokenized successfully",
        status: "success",
        duration: 2500,
      });

      setFormData({
        selectedColumn: columns[0],
      });
      queryClient.invalidateQueries(["datasets", datasetId]);
    },
    onError: (error) => {
      console.log("tokenize column error", error);

      toast({
        title: "An error occurred while tokenizing column data",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Tokenize Column Data
      </Heading>
      <Select
        onChange={(e) =>
          setFormData((prevForm) => ({
            ...prevForm,
            selectedColumn: e.target.value,
          }))
        }
        value={formData.selectedColumn}
        size="sm"
      >
        {columns.map((column: string) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </Select>
      <Flex mt={2} justifyContent={"flex-end"}>
        <Button size="sm" isDisabled={isLoading} onClick={() => mutate()}>
          {isLoading ? <Spinner /> : "Apply"}
        </Button>
      </Flex>
    </>
  );
};

export default TokenizeColumn;
