import axios from "../axios";

type UploadDatasetParams = {
  file: File;
  token: string;
};
export const uploadDataset = async ({ file, token }: UploadDatasetParams) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post("/dataset", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

type GetUserDatasetsParams = {
  token: string | null;
};
export const getUserDatasets = async ({ token }: GetUserDatasetsParams) => {
  if (!token) throw Error("User must be logged in");
  const response = await axios.get("/get_user_datasets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.datasets;
};

type DeleteDatasetParams = {
  datasetId: string;
  token: string | null;
};
export const deleteDataset = async ({
  datasetId,
  token,
}: DeleteDatasetParams) => {
  if (!token) throw Error("User must be logged in");
  await axios.delete(`/dataset/${datasetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type GetDatasetParams = {
  datasetId: string;
  token: string | null;
};

export const getDataset = async ({ datasetId, token }: GetDatasetParams) => {
  if (!token) throw Error("User must be logged in");
  const response = await axios.get(`/dataset/${datasetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

type ExportDatasetParams = {
  datasetId: string;
  fileType: string;
};

export const exportDataset = async ({
  datasetId,
  fileType,
}: ExportDatasetParams) => {
  const response = await axios.post("/export_dataset", {
    dataset_id: datasetId,
    file_type: fileType,
  });
  return response.data;
};
