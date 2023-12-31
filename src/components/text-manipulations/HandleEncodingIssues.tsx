import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { handleEncodingIssues } from "../../api/text";
import EncodingTypes, { encodingOptions } from "../../types/EncodingTypes";
import EncodingErrorTypes, {
  encodingErrorOptions,
} from "../../types/EncodingErrorTypes";

type HandleEncodingIssuesProps = {
  columns: string[];
  datasetId: string;
};
const HandleEncodingIssues = ({
  columns,
  datasetId,
}: HandleEncodingIssuesProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    encoding: encodingOptions[0],
    errors: encodingErrorOptions[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      handleEncodingIssues({
        column: formData.selectedColumn,
        encoding: formData.encoding,
        errors: formData.errors,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("handle encoding issues success", data);
      toast({
        title: "Encoding issues handled successfully",
        status: "success",
        duration: 2500,
      });

      queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("handle encoding issues error", error);

      toast({
        title: "An error occurred while handling the encoding issues",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Handle Encoding Issues
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
          <FormLabel>Encoding Option</FormLabel>
          <Select
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                encoding: e.target.value as EncodingTypes,
              }))
            }
            value={formData.encoding}
            size="sm"
          >
            {encodingOptions.map((option: EncodingTypes) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Errors</FormLabel>
          <Select
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                errors: e.target.value as EncodingErrorTypes,
              }))
            }
            value={formData.errors}
            size="sm"
          >
            {encodingErrorOptions.map((option: EncodingErrorTypes) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
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

export default HandleEncodingIssues;
