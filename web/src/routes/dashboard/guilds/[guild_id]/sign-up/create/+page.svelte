<script lang="ts">
  import { page } from "$app/stores";
  import axios from "axios";
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";

  let welcomeChannel: string = "";
  let guildChannels: any = [];

  const getGuild = async () => {
    try {
      const res = await axios.get(
        `/api/discord/getGuild?id=${$page.params.guild_id}`
      );

      const guild = res.data;

      console.log(guild.channels);

      if (res.status === 200) {
        return guild;
      } else {
        throw new Error(guild);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getGuildChannels = async () => {
    try {
      const res = await axios.get(
        `/api/discord/getGuildChannels?id=${$page.params.guild_id}`
      );

      const channels = res.data;

      console.log(channels);

      if (res.status === 200) {
        return channels;
      } else {
        throw new Error(channels);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  onMount(async () => {
    guildChannels = await getGuildChannels();
  });
</script>

<div class="flex flex-col flex-grow w-full">
  <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-3 grid-flow-row"> -->
  <div class="flex flex-col gap-3">
    <a
      href={`/dashboard/guilds/${$page.params.guild_id}`}
      class="flex flex-row items-center gap-2 hover:-translate-x-1 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-arrow-back-up"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 14l-4 -4l4 -4" />
        <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
      </svg>
      Back</a
    >
    Create Sign Up
    {#await getGuild()}
      <h1>Loading</h1>
    {:then guild}
      <div
        class={"w-fit h-fit rounded-md flex flex-row items-center p-2 justify-start gap-3 font-base text-lg"}
      >
        <img
          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
          alt="Guild Icon"
          class="w-10 h-10 bg-white rounded-md border border-black p-1"
        />
        <h1>{guild.name}</h1>
        <!-- <p>{guild.id}</p> -->
      </div>
      <div>
        <h1>Select Welcome Channel</h1>
        <select>
          {#each guildChannels as channel (channel.id)}
            {#if channel.type === 0}
              <option value={channel.id}>{channel.name}</option>
            {/if}
          {/each}
        </select>
      </div>
    {:catch err}
      <p>{err}</p>
    {/await}
  </div>
  <!-- </div> -->
</div>
