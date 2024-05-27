// CardCategoria.js
import React from 'react';
import { Link } from 'react-router-dom';

const CardCategoria = ({ id, title, image, description, category }) => {
  const imageUrl = image?.length > 0 ? image[0].urlImg : '';

  return (
    <div className="card-categoria">
      <Link to={`/recipe/${id}`}>
        <img src={imageUrl} alt={title} className="card-categoria-image" />
        <div className="card-categoria-content">
          <h3 className="card-categoria-title">{title}</h3>
          <p className="card-categoria-description">{description}</p>
          <div className="card-categoria-category">
            {category.map((cat) => (
              <span key={cat.id}>{cat.categorias}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardCategoria;
