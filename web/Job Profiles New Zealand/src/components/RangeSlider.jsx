import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  Stack,
  Input,
  TextField,
  FormControl,
  Typography,
} from "@mui/material";
import { Label } from "@mui/icons-material";

export default function RangeSlider({ labelText }) {
  const [value, setValue] = React.useState([0, 300000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300, pl: 2, pr: 6 }}>
      <Stack direction="column">
        <Typography color="#000">{labelText}</Typography>
        <Slider
          min={0}
          step={2500}
          max={300000}
          getAriaLabel={() => "Salary range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => "$" + value}
        />
      </Stack>
    </Box>
  );
}
