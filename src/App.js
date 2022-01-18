import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Currency from "./components/Currency";
import Home from "./components/categories/Home";
import Clothes from "./components/categories/Clothes";
import Tech from "./components/categories/Tech";
import ProductDetailsPage from "./components/ProductDetailsPage";
import { ContextProvider } from "./store/context";
import Cart from "./components/cart/Cart";
import CartOverlay from "./components/cart/CartOverlay";

export class App extends Component {
  render() {
    return (
      <ContextProvider>
        <Router>
          <main className="container">
            <Header />
            <Currency />
            <CartOverlay />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clothes" element={<Clothes />} />
              <Route path="/tech" element={<Tech />} />
              <Route path="/:productId" element={<ProductDetailsPage />} />
              <Route
                path="clothes/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="tech/:productId" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </Router>
      </ContextProvider>
    );
  }
}

export default App;
