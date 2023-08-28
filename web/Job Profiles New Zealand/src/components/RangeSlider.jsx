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

export default function RangeSlider({
  labelText,
  resetSlider,
  setResetSlider,
  value,
  setValue,
}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const displayK = (value) => {
    return "$" + value / 1000 + "K";
  };

  React.useEffect(() => {
    if (resetSlider) {
      setValue([0, 300000]);
      setResetSlider(false);
    }
  }, [resetSlider]);

  return (
    <Box sx={{ width: 300, pl: 2, pr: 5 }}>
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
          valueLabelFormat={displayK}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#000">{displayK(value[0])}</Typography>
          <Typography color="#000">{displayK(value[1])}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
