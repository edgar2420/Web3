import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const UserContext = createContext();

// Hook personalizado para usar el contexto
export const useUser = () => useContext(UserContext);

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Cargar el usuario y el carrito desde localStorage al inicializar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData, cartData) => {
    setUser(userData);
    setCart(cartData || []);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("cart", JSON.stringify(cartData || []));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <UserContext.Provider value={{ user, cart, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
