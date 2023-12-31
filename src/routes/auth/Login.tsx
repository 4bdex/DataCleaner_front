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
import { TLogin, loginValidation } from "../../utils/validations";
import { login } from "../../api/user";
import { useUser } from "../../contexts/userContext";
import getErrorMessage from "../../utils/getErrorMessage";

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { saveToken } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginValidation),
  });

  const onSubmit = async (data: TLogin) => {
    console.log(data);
    console.log("inside onsubmit");

    const { email, password } = data;
    try {
      setIsSubmitting(true);
      console.log("makin request");

      const response = await login({ email, password });
      console.log("response login success", response);
      saveToken(response.data.token);
      toast({
        title: "Login Success, redirecting you to dashboard",
        status: "success",
        duration: 4000,
      });
      navigate("/dashboard");
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      toast({
        title: errorMsg,
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex p={4} align={"center"} justify={"center"} minH={"calc(100vh - 74px)"}>
      <Card>
        <CardHeader>
          <Heading size="md">Login</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <Button
              isDisabled={isSubmitting}
              type="submit"
              mt={4}
              colorScheme="teal"
              size="sm"
            >
              {isSubmitting ? <Spinner /> : "Login"}
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

export default Signup;
