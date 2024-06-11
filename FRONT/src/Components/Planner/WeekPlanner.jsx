import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import DayColumn from "./DayColumn";
import WeekNavigation from "./WeekNavigation";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useTransition, animated } from "@react-spring/web";

dayjs.extend(isoWeek);

const WeekPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("isoWeek"));
  const [plannedWeeks, setPlannedWeeks] = useState(() => {
    const savedWeeks = localStorage.getItem("plannedWeeks");
    return savedWeeks ? JSON.parse(savedWeeks) : {};
  });
  const [direction, setDirection] = useState(0);
  const today = dayjs();

  const initializeWeek = () => ({
    Lunes: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Martes: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Miércoles: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Jueves: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Viernes: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Sábado: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Domingo: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
  });

  const moveRecipe = (date, meal, recipe) => {
    console.log("moveRecipe called with:", { date, meal, recipe });

    const week = date.startOf("isoWeek").format("YYYY-MM-DD");
    const day = date.format("dddd").toLowerCase();

    const daysMap = {
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
    };

    const translatedDay = daysMap[day];
    console.log(`Translated day: ${translatedDay}`);

    setPlannedWeeks((prev) => {
      const newPlannedWeeks = { ...prev };

      if (!newPlannedWeeks[week]) {
        newPlannedWeeks[week] = initializeWeek();
      }

      const newPlannedRecipes = { ...newPlannedWeeks[week] };

      // Assign the new recipe
      newPlannedRecipes[translatedDay][meal] = recipe;

      // Ensure the day keys are correct
      const validDays = Object.values(daysMap);
      const filteredPlannedRecipes = Object.keys(newPlannedRecipes)
        .filter((key) => validDays.includes(key))
        .reduce((obj, key) => {
          obj[key] = newPlannedRecipes[key];
          return obj;
        }, {});

      newPlannedWeeks[week] = filteredPlannedRecipes;

      console.log("Filtered plannedRecipes:", filteredPlannedRecipes);
      console.log("Saving to localStorage:", newPlannedWeeks);
      localStorage.setItem("plannedWeeks", JSON.stringify(newPlannedWeeks));

      return newPlannedWeeks;
    });

    // Log the updated localStorage
    console.log(
      "LocalStorage plannedWeeks:",
      localStorage.getItem("plannedWeeks")
    );
  };

  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handlePreviousWeek = () => {
    if (!currentWeek.isSame(dayjs().startOf("isoWeek"), "week")) {
      setDirection(-1);
      setCurrentWeek(currentWeek.subtract(1, "week").startOf("isoWeek"));
    }
  };

  const handleNextWeek = () => {
    setDirection(1);
    setCurrentWeek(currentWeek.add(1, "week").startOf("isoWeek"));
  };

  const handleThisWeek = () => {
    setDirection(0);
    setCurrentWeek(dayjs().startOf("isoWeek"));
  };

  const handleNextNextWeek = () => {
    setDirection(1);
    setCurrentWeek(currentWeek.add(2, "week").startOf("isoWeek"));
  };

  const currentWeekStr = currentWeek.format("YYYY-MM-DD");
  const plannedRecipes = plannedWeeks[currentWeekStr] || initializeWeek();

  const getDatesForWeek = (weekStart) =>
    days.map((_, index) => weekStart.add(index, "day"));

  const dates = getDatesForWeek(currentWeek);

  const transitions = useTransition(currentWeekStr, {
    from: {
      position: "absolute",
      opacity: 0,
      transform: `translateX(${direction * 100}%)`,
    },
    enter: { opacity: 1, transform: `translateX(0%)` },
    leave: { opacity: 0, transform: `translateX(${direction * -100}%)` },
    config: { tension: 50, friction: 20 },
  });

  const currentMonth = currentWeek.format("MMMM YYYY");

  useEffect(() => {
    console.log("Current plannedWeeks:", plannedWeeks);
  }, [plannedWeeks]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      height="90vh"
    >
      <Typography variant="h5" style={{ fontWeight: 600 }} gutterBottom>
        {currentMonth}
      </Typography>
      <WeekNavigation
        currentWeek={currentWeek}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onThisWeek={handleThisWeek}
        onNextNextWeek={handleNextNextWeek}
      />
      <Box position="relative" width="100%" flexGrow={1} overflow="hidden">
        {transitions((style, item) => (
          <animated.div
            style={{ ...style, width: "100%", height: "150%" }}
            key={item}
          >
            <Grid
              container
              spacing={2}
              style={{
                flexWrap: "nowrap",
                whiteSpace: "nowrap",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {dates.map((date, index) => (
                <Grid
                  item
                  key={days[index]}
                  style={{ flex: 1, minWidth: "14.285%" }}
                >
                  <DayColumn
                    day={days[index]}
                    date={date}
                    plannedRecipes={plannedRecipes[days[index]]}
                    moveRecipe={moveRecipe} // Pasar moveRecipe directamente
                    isToday={date.isSame(today, "day")}
                  />
                </Grid>
              ))}
            </Grid>
          </animated.div>
        ))}
      </Box>
    </Box>
  );
};

export default WeekPlanner;
