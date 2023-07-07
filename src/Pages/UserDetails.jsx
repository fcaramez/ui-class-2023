import { useNavigate, useParams } from "react-router-dom";
import useSwr from "swr";
import { fetcher } from "../utils/helpers";
import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: response,
    error,
    isLoading,
  } = useSwr(`https://reqres.in/api/users/${id}`, fetcher);

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (!isLoading && !error) {
      setName(`${response.data.first_name} ${response.data.last_name}`);
      setEmail(response.data.email);
    }
  }, [response]);

  const handleUpdate = e => {
    e.preventDefault();

    fetch(`https://reqres.in/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
      method: "PUT",
    })
      .then(res => res.json())
      .then(() => navigate("/users"))
      .catch(e => console.log(e));
  };

  if (isLoading) {
    return (
      <Center
        h={"100vh"}
        w={"100vw"}
      >
        <Spinner size={"xl"} />
      </Center>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error getting users at this time</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdate}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={"gray.80"}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
          >
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack
              direction={["column", "row"]}
              spacing={6}
            >
              <Center>
                <Avatar
                  size="xl"
                  src={response.data.avatar}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl
            id="userName"
            isRequired
          >
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              onChange={e => setName(e.target.value)}
              value={name}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl
            id="email"
            isRequired
          >
            <FormLabel>Email address</FormLabel>
            <Input
              onChange={e => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              value={response.data.email}
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <Stack
            spacing={6}
            direction={["column", "row"]}
          >
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              onClick={() => navigate("/users")}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
