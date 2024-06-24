import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { bonappetitApi } from '../../api/axiosConfig';

const RecipeRatingDetails = ({ recipeId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [cantRating, setCantRating] = useState(0);

  useEffect(() => {
    if (recipeId) {
      fetchAverageRating();
      fetchCantRating();
    }
  }, [recipeId]);

  const fetchAverageRating = () => {
    bonappetitApi.get(`/recetas/${recipeId}/puntaje`)
      .then(response => {
        setAverageRating(response.data);
      })
      .catch(error => {
        console.error('Error fetching average rating:', error);
      });
  };

  const fetchCantRating = () => {
    bonappetitApi.get(`/recetas/${recipeId}/cantCalificaciones`)
      .then(response => {
        setCantRating(response.data);
      })
      .catch(error => {
        console.error('Error fetching rating count:', error);
      });
  };

  return (
    <div className="rating-container">
      {averageRating > 4 ? (
        <div className="high-rating">
          <div className="laurel-leaves">
            <i className="fas fa-medal"></i>
            <span className="average-rating">{averageRating.toFixed(1)}</span>
          </div>
          <div className="vertical-line"></div>
          <div className="rating-count">
            <span className="evaluation-cant">{cantRating}</span>
            <div className="evaluation-label">evaluaciones</div>
          </div>
        </div>
      ) : (
        <div className="high-rating">
          <div className="laurel-leaves">
            <span className="average-rating">{averageRating.toFixed(1)}</span>
          </div>
          <div className="vertical-line"></div>
          <div className="rating-count">
            <span className="evaluation-cant">{cantRating}</span>
            <div className="evaluation-label">evaluaciones</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeRatingDetails;
