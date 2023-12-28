import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  useColorMode,
} from "@chakra-ui/react";
import { Link, Link as ReactRouterLink } from "react-router-dom";

import { useUser } from "../contexts/userContext";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { token, logout } = useUser();
  return (
    <Flex
      py={4}
      px={2}
      borderBottom={"2px solid gray"}
      align={"center"}
      justify={"space-between"}
    >
      <Heading as="h1" size="lg">
        <Link to={token ? "/dashboard" : "/"}>Data Cleaner</Link>
      </Heading>
      <Flex gap={3} align={"center"}>
        {token ? (
          <Flex gap={3} align={"center"}>
            <ChakraLink as={ReactRouterLink} to="/">
              Home
            </ChakraLink>
            <ChakraLink color="red.300" onClick={logout}>
              Logout
            </ChakraLink>
          </Flex>
        ) : (
          <Flex gap={3} align={"center"}>
            <ChakraLink as={ReactRouterLink} to="/login">
              Login
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/signup">
              Signup
            </ChakraLink>
          </Flex>
        )}
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Nav;
