import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { bonappetitApi } from '../../api/axiosConfig';

const RecipeRatingDetails = ({ recipe }) => {
  const { puntajePromedio, cantCalificaciones } = recipe;

  return (
    <div className="rating-container">
      {puntajePromedio > 4 ? (
        <div className="high-rating">
          <div className="laurel-leaves">
            <i className="fas fa-medal"></i>
            <span className="average-rating">
              {puntajePromedio?.toFixed(1)}
            </span>
          </div>
          <div className="vertical-line"></div>
          <div className="rating-count">
            <span className="evaluation-cant">{cantCalificaciones}</span>
            <div className="evaluation-label">evaluaciones</div>
          </div>
        </div>
      ) : (
        <div className="high-rating">
          <div className="laurel-leaves">
            <span className="average-rating">
              {puntajePromedio?.toFixed(1)}
            </span>
          </div>
          <div className="vertical-line"></div>
          <div className="rating-count">
            <span className="evaluation-cant">{cantCalificaciones}</span>
            <div className="evaluation-label">evaluaciones</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeRatingDetails;
