import { Slider } from "@mui/material";
import React from "react";

function OpportunitySlider({ opportunity }) {
  let myOpColor = "red";
  let myOpValue = "10";
  if (opportunity == "Average") {
    myOpColor = "orange";
    myOpValue = "50";
  } else {
    myOpColor = "green";
    myOpValue = "83";
  }

  return (
    <Slider
      valueLabelDisplay="on"
      valueLabelFormat={(value) => <div>{opportunity}</div>}
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
          backgroundImage: `linear-gradient(120deg, ${myOpColor}, ${myOpColor})`,
        },
        "& .MuiSlider-valueLabel": {
          backgroundColor: myOpValue,
        },
      }}
      defaultValue={myOpValue}
      aria-label="Gradient Slider"
    />
  );
}

export default OpportunitySlider;
