import { useState } from "react";
// import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value} className="d-flex justify-content-center">
        <Box
          className="text-light d-flex justify-content-center border-bottom"
          sx={{
            maxWidth: { xs: "100%", sm: "100%" },
          }}
          style={{
            backgroundColor: "#FFF",
            width: "100%",

            opacity: "80%",
          }}
        >
          <TabList
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            TabIndicatorProps={{ style: { backgroundColor: "#f9c231" } }}
            style={{ color: "#f9c231" }}
          >
            <Tab
              label="All"
              style={{ color: "#000", fontWeight: "2rem" }}
              value="1"
            />
            <Tab
              label="Clothing "
              style={{ color: "#000", fontWeight: "2rem" }}
              value="2"
            />
            <Tab
              label="Electronics"
              style={{ color: "#000", fontWeight: "2rem" }}
              value="3"
            />
            <Tab
              label="Jewellery"
              style={{ color: "#000", fontWeight: "2rem" }}
              value="4"
            />
            <Tab
              label="Health"
              style={{ color: "#000", fontWeight: "2rem" }}
              value="5"
            />
            <Tab
              label="Skin care"
              style={{ color: "#000", fontWeight: "2rem" }}
              value="6"
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          className={`d-flex justify-content-center ${
            value !== "1" && "d-none"
          }`}
          style={{ backgroundColor: "#eee" }}
        >
          <CategoryLayout />
        </TabPanel>
        <TabPanel
          value="2"
          className={`d-flex justify-content-center ${
            value !== "2" && "d-none"
          }`}
          style={{ backgroundColor: "#eee" }}
        >
          <CategoryLayout />
        </TabPanel>
        <TabPanel
          value="3"
          className={`d-flex justify-content-center ${
            value !== "3" && "d-none"
          }`}
          style={{ backgroundColor: "#eee" }}
        >
          <CategoryLayout />
        </TabPanel>
        <TabPanel
          value="4"
          className={`d-flex justify-content-center ${
            value !== "4" && "d-none"
          }`}
          style={{ backgroundColor: "#eee" }}
        >
          <CategoryLayout />
        </TabPanel>
        <TabPanel
          value="5"
          className={`d-flex justify-content-center ${
            value !== "5" && "d-none"
          }`}
          style={{ backgroundColor: "#eee" }}
        >
          <CategoryLayout />
        </TabPanel>
        <TabPanel
          value="6"
          className={`d-flex justify-content-center ${
            value !== "6" && "d-none"
          }`}
          style={{ backgroundColor: "#eee" }}
        >
          <CategoryLayout />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
