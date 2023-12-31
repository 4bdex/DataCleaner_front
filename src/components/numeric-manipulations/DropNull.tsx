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
import { dropNull } from "../../api/number";

type DropNullProps = {
  columns: string[];
  datasetId: string;
};
const DropNull = ({ columns, datasetId }: DropNullProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      dropNull({
        column: formData.selectedColumn,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("drop null success", data);
      toast({
        title: "Dropped rows with missing values successfully",
        status: "success",
        duration: 2500,
      });

      setFormData({
        selectedColumn: columns[0],
      });
      queryClient.invalidateQueries(["datasets", datasetId]);
    },
    onError: (error) => {
      console.log("drop null error", error);
      toast({
        title: "An error occurred while dropping rows with null values",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Drop rows with missing values in a certain column
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

export default DropNull;
