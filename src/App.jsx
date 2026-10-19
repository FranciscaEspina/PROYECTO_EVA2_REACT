import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import DetalleBlog from "./pages/DetalleBlog";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";

import AdminHome from "./admin/AdminHome";
import AdminProductos from "./admin/AdminProductos";
import AdminUsuarios from "./admin/AdminUsuarios";
import ProductoForm from "./admin/ProductoForm";

export default function App() {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const totalCartCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <Navbar cartCount={totalCartCount} />
      <Routes>
        <Route path="/" element={<Home setCarrito={setCarrito} carrito={carrito} />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto setCarrito={setCarrito} carrito={carrito} />} />
        <Route path="/categorias" element={<Categorias setCarrito={setCarrito} carrito={carrito} />} />
        <Route path="/ofertas" element={<Ofertas setCarrito={setCarrito} carrito={carrito} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<DetalleBlog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/checkout" element={<Checkout carrito={carrito} setCarrito={setCarrito} />} />

        {/* Rutas de Administración */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/producto-form" element={<ProductoForm />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
      </Routes>
      <Footer />
    </Router>
  );
}