import { Box, Button, Checkbox, Flex, Input, Tooltip } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      console.log("inside if");
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post("/upload", formData);
        if (response.status === 200) {
          navigate("/dashboard", {
            state: {
              dataset: response.data.dataset,
              id: response.data.dataset_id,
            },
          });
        }
        //   const response = await fetch("http://127.0.0.1:5000/upload", {
        //     method: "POST",
        //     body: selectedFile,
        //   });
        console.log("response", response);
      } catch (error) {
        // TODO: show error message
        console.log(error);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Flex
      height={"100vh"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
    >
      <h1 style={{ fontSize: "60px" }}>Welcome to Datacleaner</h1>
      <Flex gap={3} alignItems={"center"}>
        <Tooltip label="Supported file types are: csv, json, xlsx">
          <label htmlFor="file-upload">
            <Button onClick={handleButtonClick}>Import</Button>
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
        <Checkbox>has header</Checkbox>
      </Flex>
    </Flex>
  );
};

export default Home;
