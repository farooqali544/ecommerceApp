import { React, useEffect, useState } from "react";
import "./App.css";
import Body from "./Modules/Body/Body";
import Header from "./Modules/Header/Header";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Modules/Dashboard/Dashboard";
import Orders from "./Modules/Orders/Orders";
import ComingSoon from "./Modules/shared/ComingSoon/ComingSoon";
import RequireAuth from "./utils/RequireAuth";
import { AuthProvider, useAuth } from "./utils/auth";
import Signup from "./Modules/Auth/Signup";
import Signin from "./Modules/Auth/Signin";
import Products from "./Modules/Products/Products";
import ShowProduct from "./Modules/ShowProduct/ShowProduct";

function App() {
  const [rememberUser, setRememberUser] = useState(true);

  return (
    <AuthProvider>
      <div className='app'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth>
                <Body>
                  <Dashboard />
                </Body>
              </RequireAuth>
            }
          />
          <Route
            path='/products'
            element={
              <RequireAuth>
                <Body>
                  <Products />
                </Body>
              </RequireAuth>
            }
          />

          <Route
            path='/product/:id'
            element={
              <RequireAuth>
                <Body>
                  <ShowProduct />
                </Body>
              </RequireAuth>
            }
          />

          <Route
            path='/orders'
            element={
              <RequireAuth>
                <Body>
                  <Orders />
                </Body>
              </RequireAuth>
            }
          />

          <Route path='/reports' element={<ComingSoon />} />
          <Route path='/administration' element={<ComingSoon />} />
          <Route path='/help' element={<ComingSoon />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Signin setRememberUser={setRememberUser} />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
