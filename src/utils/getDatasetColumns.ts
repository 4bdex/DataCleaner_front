import { TDataset } from "../types/Dataset";

const getDatasetColumns = (dataset: TDataset) => {
  const columns = Object.keys(dataset).map((key) => {
    return key;
  });

  return columns;
};

export default getDatasetColumns;
