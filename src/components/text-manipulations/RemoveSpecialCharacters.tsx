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
import { removeSpecialCharacters } from "../../api/text";

type RemoveSpecialCharactersProps = {
  columns: string[];
  datasetId: string;
};
const RemoveSpecialCharacters = ({
  columns,
  datasetId,
}: RemoveSpecialCharactersProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      removeSpecialCharacters({
        column: formData.selectedColumn,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("remove special characters success", data);
      toast({
        title: "Special characters removed successfully",
        status: "success",
        duration: 2500,
      });

      queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("remove special characters error", error);

      toast({
        title: "An error occurred while removing special characters",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Remove Special Characters
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

export default RemoveSpecialCharacters;
