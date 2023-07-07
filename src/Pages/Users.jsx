import { Center, Grid, GridItem, Spinner } from "@chakra-ui/react";
import React from "react";
import useSwr from "swr";
import UserCard from "../Components/UserCard";
import { fetcher } from "../utils/helpers";

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

  return (
    <Grid
      alignItems="center"
      justifyContent={"center"}
      templateColumns={"repeat(4, 1fr)"}
    >
      {response.data.map(user => {
        return (
          <GridItem>
            <UserCard
              user={user}
              key={user.id}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default Users;
