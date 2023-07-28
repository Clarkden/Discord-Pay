import axios, { AxiosError } from "axios";
import { pb } from "./db/pocketbaseConnection";
import { currentUser } from "$lib/stores/user";

export const serializeNonPOJO = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const logout = async () => {
  console.log("logging out")
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
    const authData = await pb.collection("users").authWithOAuth2({
      provider: "discord",
      scopes: ["identify", "guilds", "bot", "applications.commands"],
    });

    const { meta, record } = authData;

    if (!meta || !record) {
      console.error("Authentication data is missing.");
      return;
    }

    const updateData = {
      discord_id: authData?.meta?.id,
      discord_username: authData?.meta?.username,
      access_token: authData?.meta?.access_token,
      refresh_token: authData?.meta?.refresh_token,
    };

    await pb.collection("users").update(record.id, updateData);

  } catch (error: any) {
    console.log(error);
  } finally {
    window.location.replace("/dashboard");
  }
};

export const resetPassword = async (email: string) => {
  try {
    await axios.post("/api/resetPassword", {
      email,
    });
    return { success: true, message: "Password Reset Email Sent" };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: err.response.data.message };
  }
};

export const getGuilds = async () => {

  try {
    const response = await axios.get("/api/discord/getGuilds");
    console.log(response)
    return response  || [];
  } catch (err: any) {
    console.log(err);
  }
};