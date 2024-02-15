import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SingleProduct.css";
import ProductCard from "../components/ProductCard";
import RatingsBarChart from "../components/RatingsBarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faCircle,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [bundledProducts, setBundledProducts] = useState([]);
  const [bundleDiscount, setBundleDiscount] = useState(null);
  const [totalBundlePrice, setTotalBundlePrice] = useState(null);
  const [bundleAmountSaved, setBundleAmountSaved] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ratingsDistribution, setRatingsDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });


  function simulateRatingsDistribution(averageRating, totalRatings) {
    let distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let remainingRatings = totalRatings;
    distribution[Math.round(averageRating)] = Math.round(totalRatings * 0.5);
    remainingRatings -= distribution[Math.round(averageRating)];
    while (remainingRatings > 0) {
      let rating = Math.floor(Math.random() * 5) + 1;
      let count = Math.min(
        remainingRatings,
        Math.ceil(Math.random() * (remainingRatings / 2))
      );
      distribution[rating] += count;
      remainingRatings -= count;
    }
    return distribution;
  }

  useEffect(() => {
  }, []);


  useEffect(() => {
    const fetchProductAndBundles = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.REACT_APP_DEMO_URL}/api/products/${productId}`
        );
        setProduct(productResponse.data);
        document.title = productResponse.data.product_name;
        setRatingsDistribution(
          simulateRatingsDistribution(
            productResponse.data.average_rating,
            productResponse.data.ratings_count
          )
        );
        const bundlesResponse = await axios.get(
          `${process.env.REACT_APP_DEMO_URL}/api/products/${productId}/bundles`
        );
        if (bundlesResponse.data.length > 0) {
          setBundledProducts(bundlesResponse.data[0].products);
          setBundleDiscount(bundlesResponse.data[0].discount_percentage);
          const totalBundlePriceBeforeDiscount = bundlesResponse.data[0].products.reduce(
            (total, product) => total + product.price,
            0
          );
          const discountAmount =
          totalBundlePriceBeforeDiscount * (bundlesResponse.data[0].discount_percentage / 100);
        const totalBundlePriceAfterDiscount =
          totalBundlePriceBeforeDiscount - discountAmount;
        setTotalBundlePrice(totalBundlePriceAfterDiscount.toFixed(2));
        setBundleAmountSaved(discountAmount.toFixed(2));
        } 
      } catch (error) {
        console.error("Error fetching product or bundles: ", error);
      }
    };

    fetchProductAndBundles();
  }, [productId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
          `${process.env.REACT_APP_DEMO_URL}/api/users/find_by_email?email=mflandin@gr.com`
        );
        setCurrentUser(userResponse.data);
        setIsLiked(
          userResponse.data.liked_products.includes(String(productId))
        );
      } catch (error) {
        console.error("There was an error fetching the user: ", error);
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, [productId]);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.image_urls.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image_urls.length - 1 : prevIndex - 1
    );
  };

  if (!product || !currentUser) {
    return <div className='single-product-loading'>Loading...</div>;
  }

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEMO_URL}/api/products/${product.id}/like`,
        {
          user_email: currentUser.email,
          liked: !isLiked,
        },
        { headers: { Accept: "application/json" } }
      );

      if (response.status === 200) {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error liking the product:", error);
    }
  };

  return (
    <div className="single-product-container">
      <div className="product-header-container">
        <div className="product-header">
          <div className="product-price">
            <div className="swallowtail-flag-wrapper-wrapper">
              <div className="swallowtail-flag-wrapper">
                <div className="swallowtail-flag">
                  <span className="flag-text">
                    ${product.price}
                    {product.flex_price ? "+" : ""}
                  </span>{" "}
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
              <span className="rating-number">
                {product.ratings_count} ratings
              </span>
            </div>
            <div
              className={`like ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
            >
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <button type="button" className="add-to-cart">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="product-main-container">
        <div className="product-main-section">
          <div className="image-carousel">
            {product.image_urls.length > 1 && (
              <>
                <button className="prev-button" onClick={prevImage}>
                  <FontAwesomeIcon icon={faCircleArrowLeft} />
                </button>
                <img
                  src={`${process.env.REACT_APP_DEMO_URL}${product.image_urls[currentImageIndex]}`}
                  alt={`Product ${currentImageIndex + 1}`}
                />
                <button className="next-button" onClick={nextImage}>
                  <FontAwesomeIcon icon={faCircleArrowRight} />
                </button>
                <div className="carousel-dots">
                  {product.image_urls.map((_, index) => (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={
                        currentImageIndex === index ? "dot active" : "dot"
                      }
                      key={index}
                    />
                  ))}
                </div>
              </>
            )}
            {product.image_urls.length === 1 && (
              <img
                src={`${process.env.REACT_APP_DEMO_URL}${product.image_urls[currentImageIndex]}`}
                alt={`Product ${currentImageIndex + 1}`}
              />
            )}
          </div>
          <div className="product-data-container">
            <div id="left-column">
              <div id="row1">
                <h1>{product.product_name}</h1>
              </div>
              <div id="row2">
                <div id="double-col">
                  <div id="row2-col-left">
                    <div className="product-price">
                      <div className="swallowtail-flag-wrapper-wrapper">
                        <div className="swallowtail-flag-wrapper">
                          <div className="swallowtail-flag">
                            <span className="flag-text">
                              ${product.price}
                              {product.flex_price ? "+" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="row2-col-mid">
                    <div id="user">
                      <FontAwesomeIcon icon={faCircle} />
                      {product.user.name}
                    </div>
                  </div>
                </div>
                <div id="row2-col-right">
                  <div className="rating">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <span className="rating-number">
                      &nbsp;{product.ratings_count} ratings
                    </span>
                  </div>
                </div>
              </div>
              <div
                id="row3"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
            <div id="right-column">
              <div id="row1">
                <button type="button" className="add-to-cart">
                  Add to cart
                </button>
                <div
                  className={`like ${isLiked ? "liked" : ""}`}
                  onClick={handleLike}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
              <div id="row2">
                <RatingsBarChart distribution={ratingsDistribution} />
              </div>
            </div>
          </div>
        </div>
        <div className="section-container">
          {bundledProducts.length > 0 && (
            <div className="paragraphs">
              <h2>Bundle Deal - {bundleDiscount}% off</h2>
              <div className="bundle-section">
                {bundledProducts.map((bundledProduct) => (
                  <ProductCard
                    key={bundledProduct.id}
                    product={bundledProduct}
                    isBundledProduct={true}
                    bundleDiscount={bundleDiscount}
                  />
                ))}
                <div className="bundle-purchase">
                  <div className="bundle-price">
                    Total Price: ${totalBundlePrice}
                    <p className="savings">Save ${bundleAmountSaved}</p>
                  </div>
                  <button className="bundle-add">Add all to Cart</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
