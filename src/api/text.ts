import axios from "../axios";
import AllowedLanguages from "../types/AllowedLanguages";
import EmbeddingTypes from "../types/EmbeddingTypes";

type ReplaceStringParams = {
  datasetId: string;
  column: string;
  oldString: string;
  newString: string;
};
export const replaceString = async ({
  datasetId,
  column,
  oldString,
  newString,
}: ReplaceStringParams) => {
  const response = await axios.post("/replaceString", {
    dataset_id: datasetId,
    column,
    oldString,
    newString,
  });
  return response.data;
};

// #removing special characters (dataset_id, column)
type RemoveSpecialCharactersParams = {
  datasetId: string;
  column: string;
};
export const removeSpecialCharacters = async ({
  column,
  datasetId,
}: RemoveSpecialCharactersParams) => {
  const response = await axios.post("/removeSpecialCharacters", {
    dataset_id: datasetId,
    column,
  });

  return response.data;
};

// # tokenize column data (dataset_id, column)
type TokenizeColumnDataParams = {
  datasetId: string;
  column: string;
};
export const tokenizeColumnData = async ({
  column,
  datasetId,
}: TokenizeColumnDataParams) => {
  const response = await axios.post("/tokenize", {
    dataset_id: datasetId,
    column,
  });

  return response.data;
};

// # remove stopwords (dataset_id, column, language) #language: english, french, german, spanish, arabic, russian
type RemoveStopWordsParams = {
  datasetId: string;
  column: string;
  language: AllowedLanguages;
};
export const removeStopWords = async ({
  column,
  datasetId,
  language,
}: RemoveStopWordsParams) => {
  const response = await axios.post("/removeStopwords", {
    dataset_id: datasetId,
    column,
    language,
  });

  return response.data;
};
// stemming column data (dataset_id, column, language) #language: english, french, german, spanish, arabic, russian
type StemmingParams = {
  datasetId: string;
  column: string;
  language: AllowedLanguages;
};
export const stemming = async ({
  column,
  datasetId,
  language,
}: StemmingParams) => {
  const response = await axios.post("/stemming", {
    dataset_id: datasetId,
    column,
    language,
  });

  return response.data;
};
// stemming column data (dataset_id, column, language) #language: english, french, german, spanish, arabic, russian
type LemmatizationParams = {
  datasetId: string;
  column: string;
};
export const lemmatization = async ({
  column,
  datasetId,
}: LemmatizationParams) => {
  const response = await axios.post("/lemmatization", {
    dataset_id: datasetId,
    column,
  });

  return response.data;
};
// # remove duplicate text (dataset_id, column) ## isnt working TODO
type RemoveDuplicatesInRowParams = {
  datasetId: string;
  column: string;
};
export const removeDuplicatesInRow = async ({
  column,
  datasetId,
}: RemoveDuplicatesInRowParams) => {
  const response = await axios.post("/removeDuplicatesInRow", {
    dataset_id: datasetId,
    column,
  });

  return response;
};
// # spell checking(dataset_id, column, language) language: auto, en, fr, de, es , de, ru, ar. this doesn't work TODO
type SpellCheckingParams = {
  datasetId: string;
  column: string;
  language: AllowedLanguages;
};
export const spellChecking = async ({
  column,
  datasetId,
  language,
}: SpellCheckingParams) => {
  const response = await axios.post("/spellChecking", {
    dataset_id: datasetId,
    column,
    language,
  });

  return response;
};

// # clean with custom patterns (dataset_id, column, pattern)
type CleanWithCustomPatternsParams = {
  datasetId: string;
  column: string;
  pattern: string;
};
export const cleanWithCustomPatterns = async ({
  column,
  datasetId,
  pattern,
}: CleanWithCustomPatternsParams) => {
  const response = await axios.post("/cleanWithCustomPatterns", {
    dataset_id: datasetId,
    column,
    pattern,
  });

  return response.data;
};
// # handle encoding issues (dataset_id, column, encoding,errors) #encoding: utf-8, ascii, latin-1,utf_16,utf_32 #errors: strict, ignore, replace,backslashreplace
type HandleEncodingIssuesParams = {
  datasetId: string;
  column: string;
  encoding: "utf-8" | "ascii" | "latin-1" | "utf_16" | "utf_32";
  errors: "strict" | "ignore" | "replace" | "backslashreplace";
};
export const handleEncodingIssues = async ({
  column,
  datasetId,
  encoding,
  errors,
}: HandleEncodingIssuesParams) => {
  const response = await axios.post("/handleEncodingIssues", {
    dataset_id: datasetId,
    column,
    encoding,
    errors,
  });

  return response.data;
};

// # remove whitespaces (dataset_id, column)
type RemoveWhiteSpacesParams = {
  datasetId: string;
  column: string;
};
export const removeWhiteSpaces = async ({
  column,
  datasetId,
}: RemoveWhiteSpacesParams) => {
  const response = await axios.post("/removeWhitespaces", {
    dataset_id: datasetId,
    column,
  });

  return response.data;
};

// # get text from html with beatifulsoup (dataset_id, column)
type GetTextFromHTMLParams = {
  datasetId: string;
  column: string;
};
export const getTextFromHTML = async ({
  column,
  datasetId,
}: GetTextFromHTMLParams) => {
  const response = await axios.post("/getTextFromHTML", {
    dataset_id: datasetId,
    column,
  });

  return response.data;
};

// # word embedding (dataset_id, column, embedding) #embedding: word2vec, TF-IDF, bag of words
type WordEmbeddingParams = {
  datasetId: string;
  column: string;
  embedding: EmbeddingTypes;
};
export const wordEmbedding = async ({
  column,
  datasetId,
  embedding,
}: WordEmbeddingParams) => {
  const response = await axios.post("/wordEmbedding", {
    dataset_id: datasetId,
    column,
    embedding,
  });

  return response.data;
};
