import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Clothes from "./components/Clothes";
import Tech from "./components/Tech";
import { ContextProvider } from "./store/context";

export class App extends Component {
  render() {
    return (
      <ContextProvider>
        <main className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/tech" element={<Tech />} />
          </Routes>
        </main>
      </ContextProvider>
    );
  }
}

export default App;