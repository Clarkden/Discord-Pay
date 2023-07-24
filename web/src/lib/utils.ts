import axios from "axios";
import { pb } from "./db/connection";
import { error } from "@sveltejs/kit";

export const serializeNonPOJO = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const logout = async () => {
  try {
    await axios.post("/api/logout");
    window.location.replace("/login");
  } catch (err) {
    console.log(err);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("/api/login", {
      email,
      password,
    });

    if (response.status === 200) {
      window.location.replace("/dashboard");
    }
    return { success: true, message: "Logged in successfully" };
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const register = async (
  email: string,
  name: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    const response = await axios.post("/api/register", {
      email,
      name,
      password,
      passwordConfirm,
    });

    if (response) await login(email, password);
    return { suceess: true, message: "Account created successfully" };
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const loginWithDiscord = async () => {
  try {
    const authData = await pb
      .collection("users")
      .authWithOAuth2({ provider: "discord" });
  } catch (error) {
    console.log(error);
  }
};

export const updateAuthStatus = async (token: string, model: any) => {
  try {
    await axios.post("/api/updateAuthStatus", {
      token,
      model,
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (email: string) => {
  try {
    await axios.post("/api/resetPassword", {
      email,
    });
    return {success: true, message: "Password Reset Email Sent"}
  } catch (err: any) {
    console.log(err);
    return {success: false, message: err.response.data.message}
  }
};
