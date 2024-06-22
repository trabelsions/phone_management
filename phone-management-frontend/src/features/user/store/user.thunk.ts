import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginReq, RegisterReq } from "features/user/types";
import api from "../api";

export const loginUser = createAsyncThunk(
  "user/sign-in",
  async (
    {
      data,
      onSuccess,
      onError,
    }: {
      data: LoginReq;
      onSuccess?: (message: string) => void;
      onError?: (message: string) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.login(data);
      onSuccess && onSuccess("Login with success");
      localStorage.setItem("authToken", res.data.access_token);
      window.location.replace('/admin');
      return res;
    } catch (error: any) {
      if (error?.response?.data.errors && onError) {
        const errors = error.response.data.errors;
        Object.entries<string>(errors).forEach(([field, message]) => {
          onError(message);
        });
      } else if (error?.response?.data.message && onError) {
        onError(error?.response?.data.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/sign-up",
  async (
    {
      data,
      onSuccess,
      onError,
    }: {
      data: RegisterReq;
      onSuccess?: (message: string) => void;
      onError?: (message: string) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.register(data);
      onSuccess && onSuccess("Register with success!");
      return res;
    } catch (error: any) {
      if (error?.response?.data.errors && onError) {
        const errors = error.response.data.errors;
        Object.entries<string>(errors).forEach(([field, message]) => {
          onError(message);
        });
      } else if (error?.response?.data.message && onError) {
        onError(error?.response?.data.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/current",
  async (
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: (message: string) => void;
      onError?: (message: string) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.getCurrent();
      onSuccess && onSuccess("Welcome");
      return res;
    } catch (error: any) {
      if (error?.response?.data.message && onError) {
        onError(error?.response?.data.message);
      }
      return rejectWithValue(error);
    }
  }
);
