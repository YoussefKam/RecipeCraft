import { Route, Routes, useNavigate } from "react-router-dom";

import Authenticated from "./Authenticated";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { useEffect } from "react";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import RestPassword from "../pages/auth/RestPassword";
import Search from "../pages/Search/Search";
import RecipeDetail from "../Components/RecipeDetail";

export default function UnAuthenticated({ isLoggedIn }) {
  const navigate = useNavigate();
  if (isLoggedIn) {
    console.log("authenticated is logged in ");
    navigate("/Search");
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route exact path="/login" element={<Login />} />

      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/verify-otp" element={<VerifyOTP />} />
      <Route exact path="/reset-password" element={<RestPassword />} />
      <Route exact path="/search" element={<Search />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
    </Routes>
  );
}
