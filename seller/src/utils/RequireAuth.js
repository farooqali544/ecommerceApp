import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "./auth";

import { Navigate } from "react-router-dom";
import axios from "axios";

const isSellerAuthenticated = async (auth, setIsSellerAuth) => {
  await axios
    .get("http://localhost:8000/seller/isSellerAuth", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((resp) => (!resp.data.auth ? auth.logout() : setIsSellerAuth(true)))
    .catch((err) => {
      throw err;
    });
};

export default function RequireAuth({ children }) {
  const auth = useAuth();

  // const [isSellerAuth, setIsSellerAuth] = useState(false);

  if (!auth.getCurrentUser()) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
