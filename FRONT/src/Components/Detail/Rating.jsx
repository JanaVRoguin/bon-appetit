import React, { useState, useEffect } from 'react';

import { rateRecipe } from '../../api/api';
const Rating = ({ recipeId }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${recipeId}`);
    if (savedRating !== null) {
      setRating(parseInt(savedRating));
    }
  }, [recipeId]);

  const handleRating = async (index) => {
    if (index === rating) {
      setRating(0);
      localStorage.removeItem(`rating_${recipeId}`);
      await sendRatingToBackend(0);
    } else {
      setRating(index);
      localStorage.setItem(`rating_${recipeId}`, index);
      await sendRatingToBackend(index);
    }
  };

  const sendRatingToBackend = async (rating) => {
    try {
      await rateRecipe(recipeId, rating);
      console.log('Receta calificada');
    } catch (error) {
      console.error('Error al calificar la receta:', error);
    }
  };

  return (
    <div className="rating-container">
      {[1, 2, 3, 4, 5].map((index) => (
        <i
          key={index}
          className={`fa-star ${index <= rating ? 'fas' : 'far'}`}
          onClick={() => handleRating(index)}
        ></i>
      ))}
    </div>
  );
};

export default Rating;
