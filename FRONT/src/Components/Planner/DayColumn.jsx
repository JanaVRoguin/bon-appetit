import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import MealArea from "./MealArea";

const DayColumn = ({ day, date, plannedRecipes, moveRecipe, isToday }) => {
  console.log(
    `Rendering DayColumn for ${day} on ${date.format(
      "YYYY-MM-DD"
    )} with plannedRecipes:`,
    plannedRecipes
  );

  return (
    <Paper
      style={{
        padding: "8px",
        marginBottom: "8px",
        width: "100%",
        minHeight: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        style={{ fontWeight: isToday ? "bold" : "normal" }}
      >
        {day} {date.date()}
      </Typography>
      <Grid container spacing={1}>
        <MealArea
          title="Desayuno"
          date={date}
          plannedRecipe={plannedRecipes?.Desayuno}
          moveRecipe={moveRecipe}
        />
        <MealArea
          title="Almuerzo"
          date={date}
          plannedRecipe={plannedRecipes?.Almuerzo}
          moveRecipe={moveRecipe}
        />
        <MealArea
          title="Merienda"
          date={date}
          plannedRecipe={plannedRecipes?.Merienda}
          moveRecipe={moveRecipe}
        />
        <MealArea
          title="Cena"
          date={date}
          plannedRecipe={plannedRecipes?.Cena}
          moveRecipe={moveRecipe}
        />
      </Grid>
    </Paper>
  );
};

export default DayColumn;
