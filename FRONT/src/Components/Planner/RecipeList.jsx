import React from "react";
import { List, ListItem, Paper, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  return (
    <Paper
      elevation={1}
      style={{
        padding: "16px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
      }}
    >
      <h2>Lista de Recetas</h2>
      <List>
        {recipes.map((recipe) => (
          <ListItem key={recipe.id} style={{ padding: "8px 0" }}>
            <RecipeCard recipe={recipe} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecipeList;
