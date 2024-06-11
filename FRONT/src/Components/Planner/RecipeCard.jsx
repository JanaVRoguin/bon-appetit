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
        backgroundColor: "#fafafa",
        borderRadius: "8px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid grey",
      }}
    >
      <CardContent style={{ flexGrow: 1 }}>
        <Typography variant="h6">{recipe.nombre}</Typography>
        {/* <Typography variant="body2">{recipe.descripcion}</Typography> */}
        {recipe.imagenes && recipe.imagenes[0] && (
          <img src={recipe.imagenes[0].urlImg} alt={recipe.nombre} width="50" />
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
