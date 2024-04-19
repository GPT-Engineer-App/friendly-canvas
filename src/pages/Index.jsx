import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Button, Input, FormControl, FormLabel, useToast, Heading, Text, Link, extendTheme } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaHeart } from "react-icons/fa";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
    },
  },
});

const apiBaseUrl = "https://backengine-9ey7.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        throw new Error(data.error || "Failed to login");
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        toast({
          title: "Signup Successful",
          description: "You have successfully signed up. Please log in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to signup");
      }
    } catch (error) {
      toast({
        title: "Signup Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
    setEmail("");
    setPassword("");
    toast({
      title: "Logged Out",
      description: "You have successfully logged out.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={5}>
        <VStack spacing={4}>
          <Heading>Welcome to the Interactive API</Heading>
          {!isLoggedIn ? (
            <>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
                Login
              </Button>
              <Button leftIcon={<FaUserPlus />} colorScheme="blue" onClick={handleSignup}>
                Signup
              </Button>
            </>
          ) : (
            <>
              <Text>{`Logged in as ${email}`}</Text>
              <Button leftIcon={<FaHeart />} colorScheme="pink" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
