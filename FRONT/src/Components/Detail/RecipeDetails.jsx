import React from 'react'

const RecipeDetails = ({categorías, descripcion, ingredientes, instrucciones}) => {

  return (
    <div className='recipe-detail-data'>
      <h3>Ingredientes:</h3>
      <p>{ingredientes}</p>
      <h3>Modo de preparación:</h3>
      <p>{instrucciones}</p>
      <p>{descripcion}</p>
    </div>
  )
}

export default RecipeDetails