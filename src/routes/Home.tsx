import { Button, Flex, Heading, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex
      height={"100vh"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
    >
      <Heading>Welcome to Datacleaner</Heading>
      <Text my={3}>
        Manipulate, visualize and get insights about your datasets
      </Text>
      <Flex alignItems={"center"} gap={4}>
        <Button onClick={() => navigate("/signup")}>Signup</Button>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </Flex>
    </Flex>
  );
};

export default Home;
