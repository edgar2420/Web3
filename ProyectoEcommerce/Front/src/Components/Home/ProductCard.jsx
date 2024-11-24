/* eslint-disable jsx-a11y/alt-text */
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ProductCard({ product }) {
  const defaultImage = "/images/product.jpg";
  const productImage = product.imagenUrl
    ? `http://localhost:3000${product.imagenUrl}`
    : defaultImage;

  return (
    <div className="col-lg-3 col-sm-6 col-12">
      <div className="card card-product-grid">
        <div className="img-wrap" style={{ padding: "0" }}>
          <img src={productImage} alt={product.nombre || "Producto"} />
        </div>
        <div className="info-wrap">
          <p className="title">{product.nombre}</p>
          <div className="rating-wrap">
            <ul className="rating-stars">
              <li className="stars-active" style={{ width: `${(product.rating || 0) * 20}%` }}>
                <img src="/images/stars-active.svg" alt="Estrellas activas" />
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom-wrap">
          <a href="/" className="btn btn-primary float-end">
            <FontAwesomeIcon icon={faShoppingCart} />
          </a>
          <div className="price-wrap lh-sm">
            <strong className="price">{product.precio} Bs</strong> <br />
            <small className="text-muted">{product.stock > 0 ? "Disponible" : "Agotado"}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
