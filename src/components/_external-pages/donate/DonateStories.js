import { useState } from "react";
import { capitalCase } from "change-case";
import { Tab, Tabs, Stack, Divider } from "@material-ui/core";
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import DonateStory from "./DonateStory";
import OutlineCard from "../../custom-component/OutlineCard";
import DonateUpdates from "./DonateUpdates";

// ----------------------------------------------------------------------

DonateStories.propTypes = {};

export default function DonateStories() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState("Story");

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
      <OutlineCard>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
        >
          {["Story", "Updates"].map((tab) => (
            <Tab
              disableRipple
              key={tab}
              value={tab}
              label={capitalCase(tab)}
              sx={{ px: 3 }}
            />
          ))}
        </Tabs>
        <Divider />

        {currentTab === "Story" && <DonateStory />}

        {currentTab === "Updates" && <DonateUpdates />}
      </OutlineCard>
    </Stack>
  );
}
