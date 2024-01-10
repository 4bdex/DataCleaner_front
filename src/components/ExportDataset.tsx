import { Button, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { exportDataset } from "../api/dataset";

type ExportDatasetProps = {
  datasetId: string;
  fileType: string;
};

const ExportDataset = ({ datasetId, fileType }: ExportDatasetProps) => {
  console.log("file type", fileType);

  const toast = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => exportDataset({ datasetId, fileType: "csv" }),
    onSuccess: (data) => {
      console.log("export success", data);
      const blob = new Blob([data], { type: "text/csv" });
      // Create a temporary anchor element
      const downloadLink = window.document.createElement("a");
      // Set the URL to the blob
      downloadLink.href = window.URL.createObjectURL(blob);
      // Set the filename for the downloaded file
      downloadLink.download = `exported_dataset.csv`;
      // Simulate click on the anchor to trigger download
      downloadLink.click();
      // Clean up by revoking the object URL
      window.URL.revokeObjectURL(downloadLink.href);
    },
    onError: (error) => {
      console.log("export error", error);
      toast({
        title: "Error occured while exporting your dataset!!",
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
