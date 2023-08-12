import React from "react";
import Searchbar from "./components/SearchBar";
import App from "./App";
import JobCard from "./components/JobCard";
import { Container } from "@mui/material";

function Home() {
  return (
    <>
      <Searchbar></Searchbar>
      <Container sx={{ pt: 5 }} maxWidth="lg">
        {" "}
        <JobCard></JobCard>
      </Container>
    </>
  );
}

export default Home;
