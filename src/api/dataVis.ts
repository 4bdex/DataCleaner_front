import axios from "../axios";

type GetHistogramParams = {
  datasetId: string;
  column: string;
  title: string;
  xLabel: string;
  yLabel: string;
};

export const getHistogram = async ({
  datasetId,
  column,
  title,
  xLabel,
  yLabel,
}: GetHistogramParams) => {
  const response = await axios.post("/get_histogram", {
    dataset_id: datasetId,
    title,
    column_name: column,
    xLabel,
    yLabel,
  });

  return response.data;
};

type GetBoxplotParams = {
  datasetId: string;
  title: string;
  column: string;
  xLabel: string;
  yLabel: string;
};

export const getBoxplot = async ({
  datasetId,
  title,
  column,
  xLabel,
  yLabel,
}: GetBoxplotParams) => {
  const response = await axios.post("/get_boxplot", {
    dataset_id: datasetId,
    title,
    column_name: column,
    xLabel,
    yLabel,
  });

  return response.data;
};

type GetScatterParams = {
  datasetId: string;
  title: string;
  column1: string;
  column2: string;
  xLabel: string;
  yLabel: string;
};

export const getScatter = async ({
  datasetId,
  title,
  column1,
  column2,
  xLabel,
  yLabel,
}: GetScatterParams) => {
  const response = await axios.post("/get_scatter", {
    dataset_id: datasetId,
    title,
    column_name1: column1,
    column_name2: column2,
    xLabel,
    yLabel,
  });

  return response.data;
};

// type GetDescribe = {
//   datasetId: string;
//   title: string;
//   column1: string;
//   column2: string;
//   xLabel: string;
//   yLabel: string;
// };

// export const getDescribe = async ({
//   datasetId,
//   title,
//   column1,
//   column2,
//   xLabel,
//   yLabel,
// }: GetDescribe) => {
//   const response = await axios.post("/get_describe", {
//     dataset_id: datasetId,
//     title,
//     column_name1: column1,
//     column_name2: column2,
//     xLabel,
//     yLabel,
//   });

//   return response.data;
// };

type GetLinePlotParams = {
  datasetId: string;
  column: string;
  title: string;
  xLabel: string;
  yLabel: string;
};

export const getLinePlot = async ({
  datasetId,
  column,
  title,
  xLabel,
  yLabel,
}: GetLinePlotParams) => {
  const response = await axios.post("/get_line", {
    dataset_id: datasetId,
    title,
    column_name: column,
    xLabel,
    yLabel,
  });

  return response.data;
};

type GetPiePlotParams = {
  datasetId: string;
  column: string;
  title: string;
};

export const getPiePlot = async ({
  datasetId,
  column,
  title,
}: GetPiePlotParams) => {
  const response = await axios.post("/get_pie", {
    dataset_id: datasetId,
    title,
    column_name: column,
  });

  return response.data;
};

type GetBarParams = {
  datasetId: string;
  column: string;
  title: string;
  xLabel: string;
  yLabel: string;
};

export const getBar = async ({
  datasetId,
  column,
  title,
  xLabel,
  yLabel,
}: GetBarParams) => {
  const response = await axios.post("/get_bar", {
    dataset_id: datasetId,
    title,
    column_name: column,
    xLabel,
    yLabel,
  });

  return response.data;
};
