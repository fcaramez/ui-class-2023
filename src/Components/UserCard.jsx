import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Button,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function UserCard({
  user: { first_name, last_name, email, avatar, id },
}) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box
          h={"200px"}
          borderBottom={"1px"}
          borderColor="black"
        >
          <Img
            src={avatar}
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Blog Image"}
          />
        </Box>
        <Box p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text
              fontSize={"xs"}
              fontWeight="medium"
            >
              {email}
            </Text>
          </Box>
          <Heading
            color={"black"}
            fontSize={"2xl"}
            noOfLines={1}
          >
            {first_name} {last_name}
          </Heading>
        </Box>
        <HStack
          borderTop={"1px"}
          color="black"
        >
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Button
              color="black"
              onClick={() => navigate(`/user/${id}`)}
            >
              <Text
                fontSize={"md"}
                fontWeight={"semibold"}
              >
                View more
              </Text>
              <BsArrowUpRight />
            </Button>
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsHeartFill
                fill="red"
                fontSize={"24px"}
              />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
