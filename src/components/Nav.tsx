import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      py={4}
      px={2}
      borderBottom={"2px solid gray"}
      align={"center"}
      justify={"space-between"}
    >
      <Heading as="h1" size="lg">
        Data Cleaner
      </Heading>
      <div>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
    </Flex>
  );
};

export default Nav;
