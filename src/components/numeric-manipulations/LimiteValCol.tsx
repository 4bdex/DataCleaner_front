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
import { limiteValCol } from "../../api/number";

type LimiteValColProps = {
  columns: string[];
  datasetId: string;
};
const LimiteValCol = ({ columns, datasetId }: LimiteValColProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    valeur1: 0,
    valeur2: 0,
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      limiteValCol({
        column: formData.selectedColumn,
        valeur1: formData.valeur1,
        valeur2: formData.valeur2,
        datasetId,
      }),
    onSuccess: (data) => {
      console.log("limite val col success", data);
      toast({
        title: `Column values limited between ${formData.valeur1} and ${formData.valeur2}  successfully`,
        status: "success",
        duration: 2500,
      });

      setFormData({
        selectedColumn: columns[0],
        valeur1: 0,
        valeur2: 0,
      });
      queryClient.invalidateQueries(["datasets", datasetId]);
    },
    onError: (error) => {
      console.log("limite val col error", error);

      toast({
        title: "An error occurred while limiting the column values",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <Heading mb={3} size={"sm"}>
        Limite column values between two values
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
          <FormLabel>Value 1</FormLabel>
          <Input
            size={"sm"}
            value={formData.valeur1}
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                valeur1: +e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Value 2</FormLabel>
          <Input
            size={"sm"}
            value={formData.valeur2}
            onChange={(e) =>
              setFormData((prevForm) => ({
                ...prevForm,
                valeur2: +e.target.value,
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

export default LimiteValCol;
