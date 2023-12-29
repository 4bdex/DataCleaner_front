import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TDataset } from "../types/Dataset";
import { CalendarIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteDataset } from "../api/dataset";
import { useUser } from "../contexts/userContext";

const DatasetCard = ({ dataset }: { dataset: TDataset }) => {
  const navigate = useNavigate();
  const { token } = useUser();
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: deleteDataset,
    onSuccess: () => {
      toast({
        title: "Dataset deleted succesfully",
        duration: 2500,
        status: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["datasets"] });
    },
    onError: (error) => {
      console.log("error deleting dataset", error);
      toast({
        title: "An error occured",
        duration: 2500,
        status: "error",
      });
    },
  });
  return (
    <Card width={"450px"} maxW={"100%"}>
      <CardHeader>
        <Heading size="md">{dataset.dataset_name}</Heading>
        <Flex mt={2} alignItems={"center"} gap={3}>
          <CalendarIcon />
          <Text>{dataset.date}</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex mb={3} gap={5} alignItems={"center"} justifyContent={"center"}>
          <Text>Rows: {dataset.rows}</Text>
          <Center height="20px">
            <Divider orientation="vertical" />
          </Center>
          <Text>Columns: {dataset.columns}</Text>
          <Center height="20px">
            <Divider orientation="vertical" />
          </Center>
          <Text>Size: {dataset.size}</Text>
        </Flex>
        <Flex gap={4} alignItems={"center"} justifyContent={"flex-end"}>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Manipulate
          </Button>

          <Button
            isDisabled={mutation.isLoading}
            onClick={() => mutation.mutate({ datasetId: dataset._id, token })}
            leftIcon={<DeleteIcon />}
            colorScheme="red"
          >
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default DatasetCard;
