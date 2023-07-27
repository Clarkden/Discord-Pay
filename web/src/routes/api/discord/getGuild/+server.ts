import axios from "axios";
import { DISCORD_BOT_AUTH_TOKEN } from "$env/static/private";

export const GET = async ({ locals, url }: any) => {
  const id = await url.searchParams.get("id");
  if (!locals.pb.authStore.isValid) {
    throw new Error("Unauthorized");
  }

  try {
    const { data: guild } = await axios.get(
      `https://discord.com/api/v10//guilds/${id}`,
      {
        headers: {
          Authorization: "Bot " + DISCORD_BOT_AUTH_TOKEN,
        },
      }
    );
    return new Response(JSON.stringify(guild));
  } catch (e) {
    console.log(e);
    throw new Error("Error");
  }
};
