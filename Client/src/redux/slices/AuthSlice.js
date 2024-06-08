import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, loginUser } from "../../api/services/auth.service";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  loading: false,
  error: false,
  auth: false,
  token: "",
  status: "",
  success: false,
  user: [],
  profileLoading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: () => ({
    signOut(state) {
      state.auth = false;
      state.token = null;
      localStorage.clear();
    },
  }),

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.auth = true;
      state.token = action.payload.data.token;
      state.status = action.payload.status;
      state.success = true;
      state.loading = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
      state.auth = false;
      state.loading = false;
      toast.error(action.payload, {
        autoClose: 3000,
        position: "top-right",
      });
    });

    // get Current User
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = false;
      state.profileLoading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      console.log("user payload", action.payload);
      state.user = action.payload.data.data;
      state.profileLoading = false;
    });

    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.error = "No user found";
      state.profileLoading = false;
      state.user = action.payload;
    });
  },
});

export const { signOut } = AuthSlice.actions;

export default AuthSlice.reducer;
