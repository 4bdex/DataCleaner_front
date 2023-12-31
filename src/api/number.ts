import axios from "../axios";

type DropNullParams = {
  datasetId: string;
  column: string;
};

// Droping missing value rows (column, dataset_id)
export const dropNull = async ({ datasetId, column }: DropNullParams) => {
  const response = await axios.post("/dropNull", {
    dataset_id: datasetId,
    column,
  });
  return response;
};

type ReplaceByAverageParams = {
  datasetId: string;
  column: string;
};

// Replace by average # Attributs : column,dataset_id
export const replaceByAverage = async ({
  datasetId,
  column,
}: ReplaceByAverageParams) => {
  const response = await axios.post("/replaceByMean", {
    dataset_id: datasetId,
    column,
  });
  return response;
};

type ReplaceByMedianParams = {
  datasetId: string;
  column: string;
};

// Replace by median # Attributs : column,dataset_id
export const replaceByMedian = async ({
  datasetId,
  column,
}: ReplaceByMedianParams) => {
  const response = await axios.post("/replaceByMedian", {
    dataset_id: datasetId,
    column,
  });
  return response;
};

type ReplaceNumber = {
  datasetId: string;
  column: string;
  valeur: number;
};

// Remplacer par une valeur # Attributs : column,dataset_id,valeur #print(replaceByVal(data,'age',66))
export const replaceNumber = async ({
  datasetId,
  column,
  valeur,
}: ReplaceNumber) => {
  const response = await axios.post("/replaceByVal", {
    dataset_id: datasetId,
    column,
    valeur,
  });
  return response;
};

type LimiteValColParams = {
  datasetId: string;
  column: string;
  valeur1: number;
  valeur2: number;
};

// Min,Max d'une colonne # Attributs : column,dataset_id,valeur1,valeur2  #print(min_max_col(data,'age',18,40))

export const limiteValCol = async ({
  datasetId,
  column,
  valeur1,
  valeur2,
}: LimiteValColParams) => {
  const response = await axios.post("/LimiteValCol", {
    dataset_id: datasetId,
    column,
    valeur1,
    valeur2,
  });
  return response;
};

type ReplaceByLogTransformationParams = {
  datasetId: string;
  column: string;
};

// log transformation # Attributs : column,dataset_id  #print(log_Transformation(data,'age'))
export const replaceByLogTransformation = async ({
  datasetId,
  column,
}: ReplaceByLogTransformationParams) => {
  const response = await axios.post("/replaceByLog_Transformation", {
    dataset_id: datasetId,
    column,
  });
  return response;
};
