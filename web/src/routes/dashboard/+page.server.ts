import axios from "axios";

export const load = async ({ locals }: any) => {
  let guilds: any[] = [];
  try {
    const userGuilds = await axios.get("/api/discord/getGuilds");
  } catch (err: any) {
    console.log(err);
  }

  if (guilds.data) {
    return {
      guilds: guilds.data,
    };
  }

  return {
    guilds: undefined,
  };
};
