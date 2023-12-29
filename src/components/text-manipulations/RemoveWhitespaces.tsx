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
import { removeWhiteSpaces } from "../../api/text";

type RemoveWhitespacesProps = {
  columns: string[];
  datasetId: string;
};
const RemoveWhitespaces = ({ columns, datasetId }: RemoveWhitespacesProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      removeWhiteSpaces({
        column: formData.selectedColumn,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("white spaces remove success", data);
      toast({
        title: "White spaces removed successfully",
        status: "success",
        duration: 2500,
      });

      setFormData({
        selectedColumn: columns[0],
      });
      queryClient.invalidateQueries(["datasets", datasetId]);
    },
    onError: (error) => {
      console.log("white spaces remove error", error);
      toast({
        title: "An error occurred while removing white spaces",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Remove whitespaces
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

export default RemoveWhitespaces;
