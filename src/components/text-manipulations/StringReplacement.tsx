import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { replaceString } from "../../api/text";

type StringReplacementProps = {
  columns: string[];
  datasetId: string;
};
const StringReplacement = ({ columns, datasetId }: StringReplacementProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    oldString: "",
    newString: "",
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      replaceString({
        column: formData.selectedColumn,
        oldString: formData.oldString,
        newString: formData.newString,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("string replace success", data);
      toast({
        title: "String was replaced successfully",
        status: "success",
        duration: 2500,
      });

      setFormData({
        selectedColumn: columns[0],
        oldString: "",
        newString: "",
      });
      queryClient.invalidateQueries(["datasets", datasetId]);
    },
    onError: (error) => {
      console.log("string replace error", error);

      toast({
        title: "An error occurred while replacing your string",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        String replacement
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
      <Flex my={2} gap={3}>
        <FormControl>
          <FormLabel>Old string</FormLabel>
          <Input
            size={"sm"}
            value={formData.oldString}
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                oldString: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>New string</FormLabel>
          <Input
            size={"sm"}
            value={formData.newString}
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                newString: e.target.value,
              }))
            }
          />
        </FormControl>
      </Flex>
      <Flex justifyContent={"flex-end"}>
        <Button size="sm" isDisabled={isLoading} onClick={() => mutate()}>
          {isLoading ? <Spinner /> : "Apply"}
        </Button>
      </Flex>
    </>
  );
};

export default StringReplacement;
