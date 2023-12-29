import { Button, Input, Spinner, Tooltip, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useUser } from "../contexts/userContext";
import { useMutation, useQueryClient } from "react-query";
import { uploadDataset } from "../api/dataset";

const UploadDataset = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useUser();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(uploadDataset, {
    onSuccess: () => {
      // Invalidate and refetch
      toast({
        title: "Dataset uploaded succesfully, refetching your datasets...",
        status: "success",
        duration: 2500,
      });
      queryClient.invalidateQueries(["datasets"]);
    },
    onError: (error) => {
      console.log("error uploading dataset", error);

      toast({
        title: "An error occured while uploading your dataset",
        status: "error",
        duration: 2500,
      });
    },
  });
  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (!token) return;
      mutation.mutate({
        file: selectedFile,
        token,
      });
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <Tooltip label="Supported file types are: csv, json, xlsx">
        <label htmlFor="file-upload">
          <Button isDisabled={mutation.isLoading} onClick={handleButtonClick}>
            {mutation.isLoading ? <Spinner /> : "Upload Dataset"}
          </Button>
        </label>
      </Tooltip>
      <Input
        id="file-upload"
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        accept=".json, .xlsx, .csv"
        onChange={handleFileInputChange}
      />
    </>
  );
};

export default UploadDataset;
