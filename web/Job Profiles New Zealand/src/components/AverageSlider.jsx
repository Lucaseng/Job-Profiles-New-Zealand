import { Slider } from "@mui/material";
import React from "react";

function AverageSlider() {
  const formatLabel = () => {};
  return (
    <Slider
      valueLabelDisplay="on"
      valueLabelFormat={(value) => <div>Average</div>}
      disabled
      sx={{
        width: "18vw",
        "& .MuiSlider-rail": {
          backgroundImage: "linear-gradient(120deg, #EF6F6C, #F7B32B, #56E39F)",
        },
        "& .MuiSlider-track": {
          backgroundImage: "linear-gradient(120deg, #EF6F6C, #F7B32B)",
          color: "#fff", // Remove the outline
        },
        "& .MuiSlider-thumb": {
          backgroundImage: "linear-gradient(120deg, #F7B32B, #F7B32B)",
        },
        "& .MuiSlider-valueLabel": {
          backgroundColor: "#F7B32B",
        },
      }}
      defaultValue={50}
      aria-label="Gradient Slider"
    />
  );
}

export default AverageSlider;
