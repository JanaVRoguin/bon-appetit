import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Drawer,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import WeekPlanner from "../Components/Planner/WeekPlanner";
import RecipeList from "../Components/Planner/RecipeList";
import { fetchRecipes } from "../api/api";

const Planner = () => {
  const [recipes, setRecipes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    getRecipes();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container
        maxWidth="xl"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={toggleDrawer} edge="start">
            <MenuIcon />
          </IconButton>
        </Box>
        <Grid
          container
          spacing={3}
          style={{ flex: 1, justifyContent: "center", overflowX: "auto" }}
        >
          <h1 className="title-planner">Planificador Semanal de Recetas</h1>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            variant="persistent"
            PaperProps={{ style: { width: 300, position: "absolute" } }}
          >
            <Box
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
              style={{ width: 300 }}
            >
              <RecipeList recipes={recipes} />
            </Box>
          </Drawer>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <div className="week-planner" style={{ width: "100%" }}>
              <WeekPlanner />
            </div>
          </Grid>
        </Grid>
      </Container>
    </DndProvider>
  );
};

export default Planner;
