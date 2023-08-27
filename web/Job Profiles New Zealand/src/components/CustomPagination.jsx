import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Container,
  Pagination,
  AppBar,
  Toolbar,
} from "@mui/material";
import JobCard from "./JobCard";

function CustomPagination({
  data,
  search,
  setSearch,
  numPages,
  reset,
  setReset,
}) {
  const [page, setCurrentPage] = useState(1);
  useEffect(() => {
    if (reset) {
      setCurrentPage(1);
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search[0]]);
  const changePage = (event, value) => {
    setCurrentPage(value);
    let tempSearch = [...search];
    tempSearch[1] = value - 1;

    setSearch(tempSearch);
  };
  return (
    <>
      <Container sx={{ pt: 5, pb: 7 }} maxWidth="lg">
        {data.map((job, index) => {
          {
            return <JobCard key={index} jsonObj={job}></JobCard>;
          }
        })}
      </Container>
      <AppBar
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }} position="fixed">
          <Pagination
            color="primary"
            sx={{ color: "#fff" }}
            page={page}
            count={Math.floor(numPages / 10)}
            shape="rounded"
            onChange={changePage}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default CustomPagination;
