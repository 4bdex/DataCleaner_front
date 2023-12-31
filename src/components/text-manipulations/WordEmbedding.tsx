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
import { wordEmbedding } from "../../api/text";

import EmbeddingTypes, { embeddingOptions } from "../../types/EmbeddingTypes";

type WordEmbeddingProps = {
  columns: string[];
  datasetId: string;
};
const WordEmbedding = ({ columns, datasetId }: WordEmbeddingProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    embedding: embeddingOptions[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      wordEmbedding({
        column: formData.selectedColumn,
        datasetId,
        embedding: formData.embedding,
      }),
    onSuccess: (data) => {
      console.log("word embedding success", data);
      toast({
        title: "Word embedded successfully",
        status: "success",
        duration: 2500,
      });

      queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("word embedding error", error);

      toast({
        title: "An error occurred while word embedding",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Word Embedding
      </Heading>

      <Flex my={2} gap={3}>
        <FormControl>
          <FormLabel>Column</FormLabel>
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
        </FormControl>
        <FormControl>
          <FormLabel>Embedding</FormLabel>
          <Select
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                embedding: e.target.value as EmbeddingTypes,
              }))
            }
            value={formData.embedding}
            size="sm"
          >
            {embeddingOptions.map((option: EmbeddingTypes) => (
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

export default WordEmbedding;
