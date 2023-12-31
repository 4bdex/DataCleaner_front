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
import { replaceNumber } from "../../api/number";

type NumberReplacementProps = {
  columns: string[];
  datasetId: string;
};
const NumberReplacement = ({ columns, datasetId }: NumberReplacementProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    valeur: 0,
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      replaceNumber({
        column: formData.selectedColumn,
        valeur: formData.valeur,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("replace by number success", data);
      toast({
        title: `Replaced column cells with value:  ${formData.valeur} successfully`,
        status: "success",
        duration: 2500,
      });

      setFormData({
        selectedColumn: columns[0],
        valeur: 0,
      });
      queryClient.invalidateQueries(["datasets", datasetId]);
    },
    onError: (error) => {
      console.log("replace by number error", error);

      toast({
        title: "An error occurred while replacing the column cells",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Replace column cells with a numeric value
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
          <FormLabel>Value</FormLabel>
          <Input
            size={"sm"}
            value={formData.valeur}
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                valeur: +e.target.value,
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

export default NumberReplacement;
