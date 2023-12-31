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
import { removeStopWords } from "../../api/text";
import AllowedLanguages, {
  allowedLanguages,
} from "../../types/AllowedLanguages";

type RemoveStopWordsProps = {
  columns: string[];
  datasetId: string;
};
const RemoveStopWords = ({ columns, datasetId }: RemoveStopWordsProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    language: allowedLanguages[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      removeStopWords({
        column: formData.selectedColumn,
        datasetId,
        language: formData.language,
      }),
    onSuccess: (data) => {
      console.log("remove stop words success", data);
      toast({
        title: "Removed stop words successfully",
        status: "success",
        duration: 2500,
      });

      queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("remove stop words error", error);

      toast({
        title: "An error occurred while removing stop words",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Remove stop words
      </Heading>
      <Flex gap={3}>
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
        <Select
          onChange={(e) =>
            setFormData((prevForm) => ({
              ...prevForm,
              language: e.target.value as AllowedLanguages,
            }))
          }
          value={formData.language}
          size="sm"
        >
          {allowedLanguages.map((language: AllowedLanguages) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex mt={2} justifyContent={"flex-end"}>
        <Button size="sm" isDisabled={isLoading} onClick={() => mutate()}>
          {isLoading ? <Spinner /> : "Apply"}
        </Button>
      </Flex>
    </>
  );
};

export default RemoveStopWords;
