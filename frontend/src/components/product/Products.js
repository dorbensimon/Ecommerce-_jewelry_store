import React from 'react';
import {Link} from 'react-router-dom';

const Products = ({ product,col }) => {
  return (
      <div  className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
        <div className="card p-3 rounded">
          <img className="card-img" src={product.images[0].url} />
          <div className="card-body d-flex flex-column">
            <h4 className="card-title">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </h4>
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.rating / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
            </div>
            <p className="card_text">${product.price}</p>
            <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-primary d-inline ml-4">
              View Details
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Products;
