import { Box, Button, Flex } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebar";

const Home = () => {
  return (
    <Flex height={"calc(100vh - 74px)"} p={3} gap={4}>
      <LeftSidebar />
      <main>
        <Button colorScheme="teal" variant="outline">
          Button
        </Button>
      </main>
    </Flex>
  );
};

export default Home;
