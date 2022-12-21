import './App.css';
import {useQuery, QueryClientProvider, QueryClient} from "@tanstack/react-query"
import React from 'react';
import axios from 'axios';

const queryClient = new QueryClient();

const fetcher = () =>
  axios
    .get("http://127.0.0.1:5000/sample")
    .then((res) => res.data);

  export const App: React.FunctionComponent = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Submission></Submission>
      </QueryClientProvider>
    );
  }

function useSubmission() {
  return useQuery(["sample"], fetcher);
}

function Submission() {
  const { data, error, isLoading } = useSubmission();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <h5>Posted by {data.author}</h5>
      <h3>{data.title}</h3>
      <a href={data.url}>Link</a>
    </div>
  )
}
