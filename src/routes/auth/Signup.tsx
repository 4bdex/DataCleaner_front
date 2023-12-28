import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

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
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TSignup, signupValidation } from "../../utils/validations";
import { signup } from "../../api/user";
import { AxiosError } from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>({
    resolver: zodResolver(signupValidation),
  });

  const onSubmit = async (data: TSignup) => {
    console.log(data);
    const { username, email, password } = data;
    try {
      // TODO: api request to signup
      setIsSubmitting(true);
      const response = await signup({ username, email, password });
      console.log("response success", response);

      toast({
        title: "Signup Success, redirecting you to login",
        status: "success",
        duration: 4000,
      });
      // setToken("azjazf");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Inside this block, err is known to be a ValidationError
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast({
            title: error.response.data.message,
            status: "error",
            duration: 2500,
          });
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          toast({
            title: "No response from server",
            status: "error",
            duration: 2500,
          });
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          toast({
            title:
              "Request has not been made, the server is down or you lost connection",
            status: "error",
            duration: 2500,
          });
          console.log("Error", error.message);
        }
      } else {
        console.log(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex p={4} align={"center"} justify={"center"} minH={"calc(100vh - 74px)"}>
      <Card>
        <CardHeader>
          <Heading size="md">Signup</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input {...register("username")} />
              {errors.username && (
                <Alert my={1} status="error">
                  <AlertIcon />
                  {errors.username.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input {...register("email")} />
              <FormHelperText>We'll never share your email.</FormHelperText>
              {errors.email && (
                <Alert my={1} status="error">
                  <AlertIcon />
                  {errors.email.message}
                </Alert>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Alert my={1} status="error">
                  <AlertIcon />
                  {errors.password.message}
                </Alert>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={"password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
              </InputGroup>

              {errors.confirmPassword && (
                <Alert my={1} status="error">
                  <AlertIcon />
                  {errors.confirmPassword.message}
                </Alert>
              )}
            </FormControl>
            <Button
              disabled={isSubmitting}
              type="submit"
              mt={4}
              colorScheme="teal"
              size="sm"
            >
              {isSubmitting ? <Spinner /> : "Signup"}
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
