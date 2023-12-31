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
import { replaceByMedian } from "../../api/number";

type ReplaceByMedianProps = {
  columns: string[];
  datasetId: string;
};
const ReplaceByMedian = ({ columns, datasetId }: ReplaceByMedianProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      replaceByMedian({
        column: formData.selectedColumn,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("replace by median success", data);
      toast({
        title: "Replaced column by its median successfully",
        status: "success",
        duration: 2500,
      });

      setFormData({
        selectedColumn: columns[0],
      });
      queryClient.invalidateQueries(["datasets", datasetId]);
    },
    onError: (error) => {
      console.log("replace by median error", error);
      toast({
        title: "An error occurred while replacing column by its median",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Replace column by its median
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

export default ReplaceByMedian;
