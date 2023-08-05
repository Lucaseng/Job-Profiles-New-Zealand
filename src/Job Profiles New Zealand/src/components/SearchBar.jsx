import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Box,
  Input,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
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
      <Box sx={{ height: "8em", backgroundColor: "#fff" }}>
        <Container sx={{ mt: 3 }}>
          <TextField
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
        </Container>
      </Box>
    </AppBar>
  );
}

export default SearchBar;
