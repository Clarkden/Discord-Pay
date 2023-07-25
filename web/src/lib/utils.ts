import axios, { AxiosError } from "axios";
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
    const authData = await pb.collection("users").authWithOAuth2({
      provider: "discord",
      scopes: ["identify", "guilds", "bot"],
    });

    console.log(authData)

    const { meta, record } = authData;

    if (!meta || !record) {
      console.error("Authentication data is missing.");
      return;
    }

    let checkTokenRecord;

    try {
      checkTokenRecord = await pb
        .collection("tokens")
        .getFirstListItem(`userID="${record.id}"`);
    } catch (error) {
      console.log(error);
    }

    if (checkTokenRecord) {
      await pb.collection("tokens").update(checkTokenRecord.id, {
        accessToken: meta.accessToken,
        refreshToken: meta.refreshToken,
        discordID: meta.id,
        discordUsername: meta.username,
      });

      return;
    }

    const data = {
      userID: record.id,
      accessToken: meta.accessToken,
      refreshToken: meta.refreshToken,
      discordID: meta.id,
      discordUsername: meta.username,
    };

    const tokenRecord = await pb.collection("tokens").create(data);
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

// export const checkBotInServer = async (userID: string) => {
//   try {
//     const { accessToken } = await pb
//       .collection("tokens")
//       .getFirstListItem(`userID="${userID}"`);

//     const response = await axios.get(`/api/checkBotInGuild`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     console.log(response);
//   } catch (error: any) {
//     console.log(error);
//   }
// };
