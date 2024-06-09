import React from 'react'

const semana = [{day:'L'}, {day:'M'}, {day:'M'}, {day:'J'}, {day:'V'}, {day:'S'}, {day:'D'}]

const RecipeCalendar = () => {
  return (
    <div className='calendar'>
      <h4>¿QUIERES AGENDARLO?</h4>
      <div className='week-container'>
        {
          semana.map( (diaSemana, i) =>
            <div key={i} className='week-day'>{diaSemana.day}</div>
          )
        }
      </div>
    </div>
  )
}

export default RecipeCalendar