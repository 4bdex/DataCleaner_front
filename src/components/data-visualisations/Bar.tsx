import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "react-query";

import { getBar } from "../../api/dataVis";
import VisualizationModal from "../VisualizationModal";

type BarProps = {
  columns: string[];
  datasetId: string;
};
const Bar = ({ columns, datasetId }: BarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  console.log("columns in histogram", columns);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    selectedColumn: columns[0],
    title: "",
    xLabel: "",
    yLabel: "",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      getBar({
        datasetId,
        column: formData.selectedColumn,
        title: formData.title,
        xLabel: formData.xLabel,
        yLabel: formData.yLabel,
      }),
    onSuccess: (data) => {
      console.log("bar success", data);
      setImgSrc(`data:image/png;base64,${data.image}`);
      onOpen();

      // queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("bar error", error);

      toast({
        title: "An error occurred while generating the bar",
        status: "error",
        duration: 2500,
      });
    },
  });
  return (
    <>
      <AccordionItem borderTopWidth={"3px"}>
        <h2>
          <AccordionButton px={0}>
            <Box as="span" flex="1" textAlign="left">
              <Heading size={"md"}>Generate Bar</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel px={0} pb={4}>
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
              <FormLabel>Title</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    title: e.target.value,
                  }))
                }
              />
            </FormControl>
          </Flex>
          <Flex my={2} gap={3}>
            <FormControl>
              <FormLabel>X Label</FormLabel>
              <Input
                value={formData.xLabel}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    xLabel: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Y Label</FormLabel>
              <Input
                value={formData.yLabel}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    yLabel: e.target.value,
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
          <Divider my={3} />
        </AccordionPanel>
      </AccordionItem>
      <VisualizationModal
        imgSrc={imgSrc}
        header={`Bar of column ${formData.selectedColumn}`}
        title={formData.title}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Bar;
