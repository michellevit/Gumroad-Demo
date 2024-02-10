import React from "react";
import "./SingleProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import axios from 'axios';


const SingleProduct = ({ product }) => {
  const productId = product.id;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://gumroad-demo.michellef.dev/products/${product.id}`);
        setSingleProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);
  return (
    <div className="single-product-container">
      <div className="product-header-container">
        <div className="product-header">
          <div className="product-name">
            <div className="product-price">
              <div className="swallowtail-flag-wrapper-wrapper">
                <div className="swallowtail-flag-wrapper">
                  <div className="swallowtail-flag">
                    <span className="flag-text">{product.price}({product.flex_price} ? "+" : "")</span>
                  </div>
                </div>
              </div>
            </div>
            <h3>{product.product_name}</h3>
            <div className="product-details">
              <div className="rating">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <span className="rating-number">{product.average_rating} ratings</span>
              </div>
              <div className="like">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <button type="button">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="product-main-container">
        <div className="product-main-section">
          <div className="image-carousel">PICTURE CAROUSEL HERE</div>
          <div className="product-data-container">
            <div id="left-column">
              <div id="row1">
                <h1>{product.product_name}</h1>
              </div>
              <div id="row2">
                <div id="row2-col-left">
                  <div className="product-price">
                    <div className="swallowtail-flag-wrapper-wrapper">
                      <div className="swallowtail-flag-wrapper">
                        <div className="swallowtail-flag">
                          <span className="flag-text">{product.price}({product.flex_price} ? "+" : "")</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="row2-col-mid">{product.user}</div>
                <div id="row2-col-right">
                  <div className="rating">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <span className="rating-number">&nbsp;{product.average_rating} ratings</span>
                  </div>
                </div>
              </div>
              <div id="row3">{product.description}</div>
            </div>
            <div id="right-column">
              <div id="row1">
                <button type="button">Add to cart</button>
                <div className="like">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
              <div id="row2">Rating Bar Chart</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
