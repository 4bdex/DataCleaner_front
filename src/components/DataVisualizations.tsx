import { Accordion, Flex } from "@chakra-ui/react";
import {
  Histogram,
  Boxplot,
  LinePlot,
  ScatterPlot,
  PiePlot,
  Bar,
} from "./data-visualisations";

const DataVisualizations = ({
  columns,
  datasetId,
}: {
  columns: string[];
  datasetId: string;
}) => {
  return (
    <Flex direction={"column"} gap={3}>
      <Accordion allowToggle>
        <Histogram datasetId={datasetId} columns={columns} />
        <Boxplot datasetId={datasetId} columns={columns} />
        <LinePlot datasetId={datasetId} columns={columns} />
        <ScatterPlot datasetId={datasetId} columns={columns} />
        <PiePlot datasetId={datasetId} columns={columns} />
        <Bar datasetId={datasetId} columns={columns} />
      </Accordion>
    </Flex>
  );
};

export default DataVisualizations;
