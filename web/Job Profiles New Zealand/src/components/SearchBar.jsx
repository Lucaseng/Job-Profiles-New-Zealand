import React, { useEffect } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Box,
  Input,
  InputAdornment,
  Container,
  Chip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import RangeSlider from "./RangeSlider";

function SearchBar({ search, setSearch, reset, setReset, sort, setSort }) {
  const [resetSlider, setResetSlider] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [entrySalValue, setEntrySalValue] = React.useState([0, 300000]);
  const [expSalValue, setExpSalValue] = React.useState([0, 300000]);

  useEffect(() => {
    let tempSearch = [...search];
    tempSearch[3] = entrySalValue;
    tempSearch[1] = 0;
    setSearch(tempSearch);
  }, [entrySalValue]);

  useEffect(() => {
    let tempSearch = [...search];
    tempSearch[4] = expSalValue;
    tempSearch[1] = 0;
    setSearch(tempSearch);
  }, [expSalValue]);

  const handleChange = (event) => {
    let tempSearch = [...search];
    tempSearch[0] = event.target.value;
    tempSearch[1] = 0;
    setSearch(tempSearch);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleReset = (event) => {
    setSort("");
    setSearch(["", 0, "", [0, 300000], [0, 300000]]);
    setResetSlider(true);
    setKeyword("");
    setReset(true);
  };

  const handleText = (event, value) => {
    let tempSearch = [...search];
    tempSearch[2] = event.target.value;
    tempSearch[1] = 0;
    setSearch(tempSearch);
    setKeyword(event.target.value);
  };

  return (
    <AppBar sx={{ bgcolor: "" }} position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "Medium" }}>
          Job Profiles New Zealand
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "light" }}>
          v1.0
        </Typography>
      </Toolbar>
      <Box sx={{ height: "13em", backgroundColor: "#fff" }}>
        <Container sx={{ mt: 3 }}>
          <Stack direction="row">
            <TextField
              onChange={handleText}
              value={keyword}
              id="input-with-icon-textfield"
              label="Search"
              placeholder="Keywords"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Stack>

          <Stack
            direction="row"
            sx={{
              mt: 3,
              alignItems: "center",
            }}
          >
            <div>
              <FormControl sx={{ width: 130, pr: 2 }}>
                <InputLabel>Opportunity</InputLabel>
                <Select
                  sx={{ borderRadius: "30px" }}
                  value={search[0]}
                  label="Opportunity"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Poor"}>Poor</MenuItem>
                  <MenuItem value={"Average"}>Average</MenuItem>
                  <MenuItem value={"Good"}>Good</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: 150, pr: 4 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  sx={{ borderRadius: "30px" }}
                  value={sort}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"EntrySalaryLower"}>Entry Salary</MenuItem>
                  <MenuItem value={"ExpSalaryUpper"}>
                    Experienced Salary
                  </MenuItem>
                  <MenuItem value={"title"}>Title</MenuItem>
                  <MenuItem value={"opportunity"}>Opportunity</MenuItem>
                </Select>
              </FormControl>
            </div>

            <RangeSlider
              resetSlider={resetSlider}
              setResetSlider={setResetSlider}
              labelText={"Entry Salary Range"}
              value={entrySalValue}
              setValue={setEntrySalValue}
            ></RangeSlider>
            <RangeSlider
              resetSlider={resetSlider}
              setResetSlider={setResetSlider}
              labelText={"Experienced Salary Range"}
              value={expSalValue}
              setValue={setExpSalValue}
            ></RangeSlider>
            <Button
              size="large"
              sx={{ borderRadius: "30px" }}
              variant="outlined"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        </Container>
      </Box>
    </AppBar>
  );
}

export default SearchBar;
