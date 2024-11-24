import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ApiService } from "../../service/ApiService";

export default function NewProductsSection() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener los productos desde la API
    const fetchProducts = async () => {
      try {
        const response = await ApiService.getProductos();
        setProducts(response);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="padding-y bg-light">
      <div className="container">
        <h4>Nuevos Productos</h4>
        <div className="row">
          {isLoading ? (
            <p>Cargando productos...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
    </section>
  );
}
