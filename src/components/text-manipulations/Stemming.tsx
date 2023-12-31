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
import { stemming } from "../../api/text";
import AllowedLanguages, {
  allowedLanguages,
} from "../../types/AllowedLanguages";

type StemmingProps = {
  columns: string[];
  datasetId: string;
};
const Stemming = ({ columns, datasetId }: StemmingProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    language: allowedLanguages[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      stemming({
        column: formData.selectedColumn,
        datasetId,
        language: formData.language,
      }),
    onSuccess: (data) => {
      console.log("stemmed column data success", data);
      toast({
        title: "Stemmed column data successfully",
        status: "success",
        duration: 2500,
      });

      queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("stemmed column data error", error);

      toast({
        title: "An error occurred while stemming column ata",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Stem column data
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

export default Stemming;
