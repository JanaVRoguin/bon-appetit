import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faDrumstickBite, faBreadSlice, faTint } from '@fortawesome/free-solid-svg-icons';

const NutritionalDetails = () => {
  return (
    <div className='nutritional-details'>
      <h3>Características nutricionales</h3>
      <ul>
         <li>
           <FontAwesomeIcon icon={faFire}  />
           <p>100 Kcal</p>
         </li>
         <li>
           <FontAwesomeIcon icon={faDrumstickBite}  />
           <p>80% proteínas</p>
         </li>
         <li>
           <FontAwesomeIcon icon={faBreadSlice}  />
           <p>25% carbohidratos</p>
         </li>
         <li>
           <FontAwesomeIcon icon={faTint}  />
           <p>12% grasas</p>
         </li>
      </ul>
    </div>
  );
}

export default NutritionalDetails;
