import { Slider } from "@mui/material";
import React from "react";

function PoorSlider() {
  const formatLabel = () => {};
  return (
    <Slider
      valueLabelDisplay="on"
      valueLabelFormat={(value) => <div>Poor</div>}
      disabled
      sx={{
        width: "18vw",
        "& .MuiSlider-rail": {
          backgroundImage: "linear-gradient(120deg, #EF6F6C, #F7B32B, #56E39F)",
        },
        "& .MuiSlider-track": {
          backgroundImage: "linear-gradient(120deg, #EF6F6C, #EF6F6C)",
          color: "#fff", // Remove the outline
        },
        "& .MuiSlider-thumb": {
          backgroundImage: "linear-gradient(120deg, #EF6F6C, #EF6F6C)",
        },
        "& .MuiSlider-valueLabel": {
          backgroundColor: "#EF6F6C",
        },
      }}
      defaultValue={15}
      aria-label="Gradient Slider"
    />
  );
}

export default PoorSlider;
