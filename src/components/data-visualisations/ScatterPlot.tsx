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

import { getScatter } from "../../api/dataVis";
import VisualizationModal from "../VisualizationModal";

type ScatterPlotProps = {
  columns: string[];
  datasetId: string;
};
const ScatterPlot = ({ columns, datasetId }: ScatterPlotProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    column1: columns[0],
    column2: columns[1],
    title: "",
    xLabel: "",
    yLabel: "",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      getScatter({
        datasetId,
        column1: formData.column1,
        column2: formData.column2,
        title: formData.title,
        xLabel: formData.xLabel,
        yLabel: formData.yLabel,
      }),
    onSuccess: (data) => {
      console.log("scatter success", data);
      setImgSrc(`data:image/png;base64,${data.image}`);
      onOpen();

      // queryClient.setQueryData(["datasets", datasetId], data.dataset);
    },
    onError: (error) => {
      console.log("scatter error", error);

      toast({
        title: "An error occurred while generating scatter plot",
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
              <Heading size={"md"}>Generate Scatter Plot</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel px={0} pb={4}>
          <Flex my={2} gap={3}>
            <FormControl>
              <FormLabel>Column 1</FormLabel>
              <Select
                onChange={(e) =>
                  setFormData((prevForm) => ({
                    ...prevForm,
                    column1: e.target.value,
                  }))
                }
                value={formData.column1}
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
              <FormLabel>Column 2</FormLabel>
              <Select
                onChange={(e) =>
                  setFormData((prevForm) => ({
                    ...prevForm,
                    column2: e.target.value,
                  }))
                }
                value={formData.column2}
                size="sm"
              >
                {columns.map((column: string) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>
          <Flex my={2} gap={3}>
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
        header={`Scatter plot of columns: ${formData.column1} and ${formData.column2}`}
        title={formData.title}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ScatterPlot;
