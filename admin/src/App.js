import React from "react";
import "./App.css";
import Body from "./Modules/Body/Body";
import Header from "./Modules/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Modules/Dashboard/Dashboard";
import Categories from "./Modules/Categories/Categories";
import SubCategories from "./Modules/SubCategories/SubCategories";
import Sellers from "./Modules/Sellers/Sellers";

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <Body>
                <Dashboard />
              </Body>
            }
          />
          <Route
            path='/categories'
            element={
              <Body>
                <Categories />
              </Body>
            }
          />
          <Route
            path='/subcategories'
            element={
              <Body>
                <SubCategories />
              </Body>
            }
          />
          <Route
            path='/sellers'
            element={
              <Body>
                <Sellers />
              </Body>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
