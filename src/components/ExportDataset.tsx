import { Button, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { exportDataset } from "../api/dataset";

type ExportDatasetProps = {
  datasetId: string;
  fileType: string;
};

const ExportDataset = ({ datasetId, fileType }: ExportDatasetProps) => {
  const toast = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => exportDataset({ datasetId, fileType }),
    onSuccess: (data) => {
      console.log("export success", data);
    },
    onError: (error) => {
      console.log("export error", error);
      toast({
        title: "Error occured while exporting your dataset",
        duration: 2500,
        status: "error",
      });
    },
  });
  return (
    <Button
      colorScheme="green"
      variant="outline"
      onClick={() => mutate()}
      isDisabled={isLoading}
    >
      Export
    </Button>
  );
};

export default ExportDataset;
