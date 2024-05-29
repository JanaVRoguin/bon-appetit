import React, { useState } from 'react'
import { ImagesCarousel } from './ImagesCarousel';

export const ImagesContainer = ({imagenes}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  }
  
  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <div className="recipe-img-container">
        {
          imagenes?.map( (imagen, i) => 
            <img key={i} src={imagen.urlImg} alt={`algo${i}`} className={`recipe-img img-${i+1}`}/>
          )
        }
        <p className='ver-mas img-5' onClick={() => handleImageClick()}>Ver más</p>
      </div>
      {isOpen && <ImagesCarousel imagenes={imagenes} selectedIndex={selectedImageIndex} onClose={handleClose} />}
    </>
  )
}