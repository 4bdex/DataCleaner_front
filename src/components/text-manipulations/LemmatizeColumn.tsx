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
import { lemmatization } from "../../api/text";

type LemmatizeColumnProps = {
  columns: string[];
  datasetId: string;
};
const LemmatizeColumn = ({ columns, datasetId }: LemmatizeColumnProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      lemmatization({
        column: formData.selectedColumn,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("lemmatize column success", data);
      toast({
        title: "Column data lemmatized successfully",
        status: "success",
        duration: 2500,
      });

      queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("lemmatize column error", error);
      toast({
        title: "An error occurred while lemmatizing column data",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Lemmatize Column Data
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

export default LemmatizeColumn;
