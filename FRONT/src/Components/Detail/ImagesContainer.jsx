import React from 'react'

const ImageContainer = ({imagenes}) => {
  return (
    <div className="recipe-img-container">
      {
        imagenes?.map( (imagen, i) => 
          <img key={i} src={imagen.urlImg} alt={`algo${i}`} className={`recipe-img img-${i+1}`}/>
        )
      }
      <p className='ver-mas img-5'>Ver más</p>
    </div>
  )
}

export default ImageContainer