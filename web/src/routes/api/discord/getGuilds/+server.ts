import { error, json } from "@sveltejs/kit";
import axios from "axios";
import { DISCORD_BOT_AUTH_TOKEN } from "$env/static/private";
import { client } from "$lib/db/redisConnection";

export const GET = async ({ locals }: any) => {
  // console.log("Checkpoint 1")
  if (!locals.pb.authStore.isValid) {
    throw error(401, { message: "Unauthorized" });
  }


  // console.log("Checkpoint 2")
  try {
    // const cachedGuilds = await client.hget(
    //   locals.pb.authStore.model.id,
    //   "guilds"
    // );
    // console.log("Checkpoint 3")

    // if (cachedGuilds) {
    //   return json(JSON.parse(cachedGuilds));
    // }

    // console.log("Checkpoint 4")

    const { data: userGuilds } = await axios.get(
      `https://discord.com/api/v10/users/@me/guilds`,
      {
        headers: {
          Authorization: "Bearer " + locals.pb.authStore.model.access_token,
        },
      }
    );

    // console.log("Checkpoint 5")

    const adminGuilds = userGuilds.filter((guild: any) => {
      return parseInt(guild.permissions) & 0x8;
    });

    // console.log("Checkpoint 6")

    const { data: botGuilds } = await axios.get(
      `https://discord.com/api/v10/users/@me/guilds`,
      {
        headers: {
          Authorization: "Bot " + DISCORD_BOT_AUTH_TOKEN,
        },
      }
    );

    // console.log("Checkpoint 7")

    const mutualGuilds = adminGuilds.filter((guild: any) => {
      return botGuilds.find((botGuild: any) => {
        return botGuild.id === guild.id;
      });
    });

    // console.log("Checkpoint 8")

    await client.hset(
      locals.pb.authStore.model.id,
      "guilds",
      JSON.stringify(mutualGuilds)
    );

    // console.log("Checkpoint 9")

    return new Response(JSON.stringify(mutualGuilds));
  } catch (err: any) {
    console.log(err);
    throw new Error(500, { message: err.message });
  }
};
