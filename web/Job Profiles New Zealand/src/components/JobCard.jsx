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

const jsonObj = {
  title: "Emergency Management Officer",
  subtitle: "\u0100piha Whakahaere Ohotata",
  description:
    "Emergency management officers plan for and respond to emergencies such as earthquakes and weather events. They also train communities to prepare for disasters.",
  opportunity: "Average",
  salary: [
    {
      text: "Emergency management officers with up to three years' experience usually earn $66K-$79K per year",
      range: [66000, 79000],
    },
    {
      text: "Emergency management officers with three or more years' experience usually earn $79K-$95K per year",
      range: [79000, 95000],
    },
  ],
  link: "https://www.careers.govt.nz/jobs-database/government-law-and-safety/government/emergency-management-officer/",
};

function JobCard() {
  return (
    <>
      <Card sx={{ height: "300px", p: 3 }}>
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
            <div>
              <Typography>Job Opportunity:</Typography>
              <Typography>{jsonObj.opportunity}</Typography>
              <GoodSlider></GoodSlider>
            </div>
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
