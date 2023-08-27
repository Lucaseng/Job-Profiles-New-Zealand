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
  const [searchArr, setSearchArr] = useState(["", 0]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://localhost:8080/api/Job/search?&page=${searchArr[1]}`;
      if (searchArr[0] != "") {
        url += `&opportunity=${searchArr[0]}`;
      }
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, [searchArr]);

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
        <Searchbar
          reset={reset}
          setReset={setReset}
          search={searchArr}
          setSearch={setSearchArr}
        ></Searchbar>
        <CustomPagination
          reset={reset}
          setReset={setReset}
          search={searchArr}
          setSearch={setSearchArr}
          data={data[1]}
          numPages={data[0]}
        ></CustomPagination>
      </>
    );
  }
}

export default Home;
