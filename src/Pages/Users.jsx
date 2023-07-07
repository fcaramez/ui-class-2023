import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import useSwr from "swr";
const fetcher = (...args) => fetch(...args).then(res => res.json());

const Users = () => {
  const {
    data: response,
    error,
    isLoading,
  } = useSwr("https://reqres.in/api/users", fetcher);

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

  return response.data.map(user => {
    return (
      <>
        <p>
          {user.first_name} {user.last_name}
        </p>
      </>
    );
  });
};

export default Users;
