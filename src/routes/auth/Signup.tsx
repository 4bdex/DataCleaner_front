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

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();
  const { setToken } = useUser();
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: api request to signup
    toast({
      title: "Signup Success",
      status: "success",
      duration: 2500,
    });
    setToken("azjazf");
    navigate("/");
  };
  return (
    <Flex align={"center"} justify={"center"} minH={"calc(100vh - 74px)"}>
      <Card>
        <CardHeader>
          <Heading size="md">Signup</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSignup}>
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
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input type={"password"} placeholder="Confirm Password" />
              </InputGroup>
            </FormControl>
            <Button type="submit" mt={4} colorScheme="teal" size="sm">
              Signup
            </Button>
          </form>
          <Divider my={3} />
          <Text>
            Already have an account?{" "}
            <ChakraLink as={ReactRouterLink} to="/login">
              Login
            </ChakraLink>{" "}
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Signup;
