import {useQuery, QueryClientProvider, QueryClient} from "@tanstack/react-query"
import React from 'react';
import axios from 'axios';
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Icon, IconProps, Image, Input, InputGroup, InputLeftElement, OmitCommonProps, Spacer, Stack, Text } from '@chakra-ui/react'
import { ChatIcon, DownloadIcon, ExternalLinkIcon, HamburgerIcon, SearchIcon,} from '@chakra-ui/icons';


const queryClient = new QueryClient();

const fetcher = () =>
  axios
    .get("http://127.0.0.1:5000/sample")
    .then((res) => res.data);

  export const App: React.FunctionComponent = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Stack spacing='16' p='16' bg="brand.back">
          <SubmissionCard/>
          <SubmissionCard />
        </Stack>
      </QueryClientProvider>
    );
  }

const CircleIcon = (props: JSX.IntrinsicAttributes & OmitCommonProps<React.SVGProps<SVGSVGElement>, keyof IconProps> & IconProps & { as?: "svg" | undefined; }) => (
  <Icon viewBox='0 0 200 200' {...props}>
    <path
      fill='orange'
      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    />
  </Icon>
)

function SearchBar() {
  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input placeholder='Search Reddit-ish' />
      </InputGroup>
    </Stack>
  )
}

function Navbar() {
  return (
    <Box position="static" top={0} p={4} zIndex={1}>
      <Flex gap='2'>
        <Box p='2'>
          <Heading size='md' position={'static'}>reddit-ish</Heading>
        </Box>
        <Spacer />
        <SearchBar />
        <Spacer />
        <ButtonGroup gap='2'>
          <Button>Get App</Button>
          <Button colorScheme='orange'>Log in</Button>
          <Button><HamburgerIcon /></Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

function useSubmission() {
  return useQuery(["sample"], fetcher);
}

function SubmissionCard() {
  const { data, error, isLoading } = useSubmission();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <Card maxW='md' bg="white">
      <CardHeader>
        <Flex>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <CircleIcon boxSize={8} color='red.500' />

            <Box>
              <Heading size='sm'>{data.subreddit_name_prefixed}</Heading>
              <Text>Posted by {data.author}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {data.title}
        </Text>
      </CardBody>
      <Image
        objectFit='cover'
        src='https://picsum.photos/200/100'
        alt='Chakra UI'
      />

      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <ChatIcon /> 88 Comments
        <ExternalLinkIcon /> Share
        <DownloadIcon /> Save
        <HamburgerIcon />
      </CardFooter>
    </Card>
  )
}
