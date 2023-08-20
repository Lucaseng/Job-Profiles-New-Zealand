import React, { useEffect, useState } from "react";
import Searchbar from "./components/SearchBar";
import App from "./App";
import JobCard from "./components/JobCard";
import { Container, Typography, Stack, CircularProgress } from "@mui/material";

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        "https://localhost:8080/api/Job/search?sortBy=-EntrySalaryLower&page=0"
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <>
        <Stack sx={{ alignItems: "center" }}>
          {" "}
          <CircularProgress />
          <Typography sx={{ paddingTop: "20px" }}>
            Hold tight - This will only take a second!
          </Typography>
        </Stack>
      </>
    );
  } else {
    return (
      <>
        <Searchbar></Searchbar>
        <Container sx={{ pt: 5 }} maxWidth="lg">
          {data.map((job, index) => {
            {
              return <JobCard key={index} jsonObj={job}></JobCard>;
            }
          })}
        </Container>
      </>
    );
  }
}

export default Home;
