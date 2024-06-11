import React from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const RecipeCard = ({ recipe, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "RECIPE_CARD",
    item: { recipe },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "#dddfdc",
        borderRadius: "8px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid grey",
      }}
    >
      <CardContent style={{ flexGrow: 1 }}>
        <h4>{recipe.nombre}</h4>
        {recipe.imagenes && recipe.imagenes[0] && (
          <img src={recipe.imagenes[0].urlImg} alt={recipe.nombre} width="60" />
        )}
      </CardContent>
      {onDelete && (
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      )}
    </Card>
  );
};

export default RecipeCard;
