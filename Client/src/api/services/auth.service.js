import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config";

//Sign In API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    const logindata = await axiosInstance
      .post("/users/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data?.data?.token);
        return response;
      })

      .catch((err) => rejectWithValue(err.response.data));

    return logindata;
  }
);



//get current user AAPI 

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (id, { rejectWithValue }) => {
    console.log("userid", id)
    const userData = await axiosInstance
      .get(`/users/${id}`)
      .then((response) => {
        return response;
      })

      .catch((err) => rejectWithValue(err.response.data));

    return userData;
  }
);