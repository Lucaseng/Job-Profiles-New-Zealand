import { Slider } from "@mui/material";
import React from "react";

function GoodSlider() {
  const formatLabel = () => {};
  return (
    <Slider
      valueLabelDisplay="on"
      valueLabelFormat={(value) => <div>Good</div>}
      disabled
      sx={{
        width: "18vw",
        "& .MuiSlider-rail": {
          backgroundImage: "linear-gradient(120deg, #EF6F6C, #F7B32B, #56E39F)",
        },
        "& .MuiSlider-track": {
          backgroundImage: "linear-gradient(120deg, #EF6F6C, #F7B32B, #56E39F)",
          color: "#fff", // Remove the outline
        },
        "& .MuiSlider-thumb": {
          backgroundImage: "linear-gradient(120deg, green, green)",
        },
        "& .MuiSlider-valueLabel": {
          backgroundColor: "green",
        },
      }}
      defaultValue={83}
      aria-label="Gradient Slider"
    />
  );
}

export default GoodSlider;
