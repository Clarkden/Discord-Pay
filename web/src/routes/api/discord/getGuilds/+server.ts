import { error, json } from "@sveltejs/kit";
import axios from "axios";
import { DISCORD_BOT_AUTH_TOKEN } from "$env/static/private";
import { client } from "$lib/db/redisConnection";

export const GET = async ({ locals }: any) => {
  try {
    const cachedGuilds = await client.hget(
      locals.pb.authStore.model.id,
      "guilds"
    );


    if (cachedGuilds) {
      return json(JSON.parse(cachedGuilds))
    }

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

    await client.hset(
      locals.pb.authStore.model.id,
      "guilds",
      JSON.stringify(mutualGuilds)
    );

    return new Response(JSON.stringify(mutualGuilds));
  } catch (err: any) {
    console.log(err);
    throw error(err.code, { message: err.message });
  }
};
