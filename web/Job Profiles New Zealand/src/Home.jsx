import React, { useEffect, useState } from "react";
import Searchbar from "./components/SearchBar";
import App from "./App";
import JobCard from "./components/JobCard";
import {
  Container,
  Typography,
  Stack,
  CircularProgress,
  Pagination,
} from "@mui/material";
import CustomPagination from "./components/CustomPagination";

function Home() {
  const [data, setData] = useState();
  const [search, setSearch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`https://localhost:8080/api/Job/search?&page=${search}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, [search]);

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
        <CustomPagination
          setSearch={setSearch}
          data={data[1]}
          numPages={data[0]}
        ></CustomPagination>
      </>
    );
  }
}

export default Home;
