import React from "react";
import {
  Card,
  Typography,
  Stack,
  Slider,
  Link,
  Button,
  Container,
  Box,
} from "@mui/material";
import GoodSlider from "./GoodSlider";
import OpportunitySlider from "./OpportunitySlider";
import AverageSlider from "./AverageSlider";
import PoorSlider from "./PoorSlider";

function JobCard({ jsonObj }) {
  const renderOpportunity = (opp) => {
    switch (opp) {
      case "Poor":
        return <PoorSlider></PoorSlider>;
      case "Average":
        return <AverageSlider></AverageSlider>;
      case "Good":
        return <GoodSlider></GoodSlider>;
    }
  };

  return (
    <>
      <Card sx={{ height: "300px", p: 3, mb: 5 }}>
        <Stack sx={{ height: "300px" }}>
          <Stack direction="row">
            <Stack sx={{ maxWidth: "47%", pr: 6 }}>
              <Typography variant="h5" fontWeight={"medium"}>
                {jsonObj.title}
              </Typography>
              <Typography>{jsonObj.subtitle}</Typography>
              <Typography sx={{ pt: 2 }}>{jsonObj.description}</Typography>
            </Stack>
            <Stack sx={{ alignContent: "center", maxWidth: "45%" }}>
              {jsonObj.salary.map((salaryObj, i) => {
                return (
                  <Typography sx={{ pb: 2 }} key={i}>
                    {salaryObj.text}
                  </Typography>
                );
              })}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            sx={{
              marginTop: "auto",
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <Stack>
              <Typography sx={{ pb: 6 }}>Job Opportunity:</Typography>
              {renderOpportunity(jsonObj.opportunity)}
            </Stack>
            <a href={jsonObj.link} target="_blank" rel="noopener noreferrer">
              <Button>Find Out More</Button>
            </a>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}

export default JobCard;
