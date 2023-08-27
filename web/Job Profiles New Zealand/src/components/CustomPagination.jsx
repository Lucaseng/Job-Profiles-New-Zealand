import React from "react";
import {
  Stack,
  Box,
  Container,
  Pagination,
  AppBar,
  Toolbar,
} from "@mui/material";
import JobCard from "./JobCard";

function CustomPagination({ data, setSearch, numPages }) {
  const changePage = (event, value) => {
    setSearch(value - 1);
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
