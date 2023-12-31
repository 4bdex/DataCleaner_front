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
import { cleanWithCustomPatterns } from "../../api/text";

type CleanWithCustomPatternsProps = {
  columns: string[];
  datasetId: string;
};
const CleanWithCustomPatterns = ({
  columns,
  datasetId,
}: CleanWithCustomPatternsProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    pattern: "",
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      cleanWithCustomPatterns({
        column: formData.selectedColumn,
        pattern: formData.pattern,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("clean with custom patterns success", data);
      toast({
        title: `Cleaned with pattern ${formData.pattern} successfully`,
        status: "success",
        duration: 2500,
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        pattern: "",
      }));

      queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("clean with custom patterns error", error);

      toast({
        title: "An error occurred while cleaning your column",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Clean with custom patterns
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
          <FormLabel>Pattern</FormLabel>
          <Input
            size={"sm"}
            value={formData.pattern}
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                pattern: e.target.value,
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

export default CleanWithCustomPatterns;
