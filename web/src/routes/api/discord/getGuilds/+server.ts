import { error } from "@sveltejs/kit";
import axios from "axios";
import { DISCORD_BOT_AUTH_TOKEN } from "$env/static/private";

export const GET = async ({ locals, request, params }: any) => {
  try {
    const { data: userGuilds } = await axios.get(
      `https://discord.com/api/v10/users/@me/guilds`,
      {
        headers: {
          Authorization: "Bearer " + locals.pb.authStore.model.accessToken,
        },
      }
    );

    const adminGuilds = userGuilds.filter((guild: any) => {
      return parseInt(guild.permissions) & 0x8;
    });

    const { data: botGuilds } = await axios.get(
      `https://discord.com/api/v10/users/@me/guilds`,
      {
        headers: {
          Authorization: "Bot " + DISCORD_BOT_AUTH_TOKEN,
        },
      }
    );

    const mutualGuilds = adminGuilds.filter((guild: any) => {
      return botGuilds.find((botGuild: any) => {
        return botGuild.id === guild.id;
      });
    });

    return new Response(JSON.stringify(mutualGuilds));
  } catch (err: any) {
    console.log(err);
    throw error(err.code, { message: err.message });
  }
};
