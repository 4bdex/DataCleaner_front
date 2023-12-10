import { FormEvent, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();
  const { setToken } = useUser();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: api request to login
    toast({
      title: "Login Success",
      status: "success",
      duration: 2500,
    });
    setToken("zefazkef");
    navigate("/");
  };
  return (
    <Flex align={"center"} justify={"center"} minH={"calc(100vh - 74px)"}>
      <Card>
        <CardHeader>
          <Heading size="md">Login</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                <ChakraLink
                  onClick={() =>
                    toast({
                      status: "info",
                      title: "We're still working on this functionality",
                      duration: 2000,
                    })
                  }
                >
                  Forgot your password?
                </ChakraLink>
              </FormHelperText>
            </FormControl>
            <Button type="submit" mt={4} colorScheme="teal" size="sm">
              Login
            </Button>
          </form>
          <Divider my={3} />
          <Text>
            No account?{" "}
            <ChakraLink as={ReactRouterLink} to="/signup">
              Signup
            </ChakraLink>{" "}
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Login;
