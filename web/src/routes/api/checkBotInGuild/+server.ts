import { error } from "@sveltejs/kit";
import axios from "axios";

export const GET = async ({ locals, request, params }) => {
  try {
    const accessToken = request.headers.get("Authorization");

    const response = await axios.get(
      `https://discord.com/api/v10/users/@me/guilds`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );

    const userGuilds = response.data.filter(
      (guild: any) => guild.owner === true
    );

    console.log(userGuilds);

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    throw error(err.data.code, { message: err.data.message });
  }
};
