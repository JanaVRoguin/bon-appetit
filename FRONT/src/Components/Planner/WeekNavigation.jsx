import React from "react";
import { IconButton, Typography, Box, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import dayjs from "dayjs";

const WeekNavigation = ({
  currentWeek,
  onPreviousWeek,
  onNextWeek,
  onThisWeek,
  onNextNextWeek,
}) => {
  const startOfWeek = dayjs(currentWeek)
    .startOf("isoWeek")
    .format("DD MMM YYYY");
  const endOfWeek = dayjs(currentWeek).endOf("isoWeek").format("DD MMM YYYY");
  const isThisWeek = currentWeek.isSame(dayjs().startOf("isoWeek"), "week");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      mb={2}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        {!isThisWeek && (
          <IconButton onClick={onPreviousWeek}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography
          variant="h6"
          style={{ margin: "0 16px" }}
        >{`${startOfWeek} - ${endOfWeek}`}</Typography>
        <IconButton onClick={onNextWeek}>
          <ArrowForward />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="outlined"
          onClick={onThisWeek}
          style={{
            marginRight: "8px",
            backgroundColor: isThisWeek ? "#1976d2" : "transparent",
            color: isThisWeek ? "white" : "black",
          }}
        >
          Esta semana
        </Button>
      </Box>
    </Box>
  );
};

export default WeekNavigation;
