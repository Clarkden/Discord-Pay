<script lang="ts">
  import DashboardNavbar from "$lib/components/navigation/DashboardNavbar.svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  export let data: any;
  $: ({ user } = data);

  //   let guilds: any[] = [];
  //   let loading: "loading" | "idle" | "error" = "loading";

  //   const getGuilds = async () => {
  //     try {
  //       const { data } = await axios.get("/api/discord/getGuilds");
  //       guilds = data;
  //     } catch (err: any) {
  //       console.log(err);
  //     }
  //   };

  //   onMount(async () => {
  //     getGuilds();
  //     loading = "idle";
  //   });
</script>

<DashboardNavbar />

<section class="p-5 flex flex-grow flex-col gap-4">
  <h1>Hi <span class="first-letter:uppercase">{user.username}!</span></h1>
  <container class="flex flex-row flex-wrap gap-2">
    {#if user.role === "" || user.role == "free"}
      <a
        href="/dashboard/upgrade"
        class="w-[300px] h-[150px] border border-gray-300 rounded-md flex flex-col items-start p-2 justify-between hover:bg-sky-50"
      >
        <h1>Upgade to Premium</h1>
      </a>
    {/if}
  </container>
  <container class="flex flex-col gap-3">
    {#each $page.data.guilds as guild (guild.id)}
      <a
        href="/dashboard/guilds/{guild.id}"
        class="w-full h-[150px] border border-gray-300 rounded-md flex flex-col items-start p-2 justify-between hover:bg-sky-50"
      >
        <h1>{guild.name}</h1>
        <p>{guild.id}</p>
        <img
          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
          alt="Guild Icon"
          class="w-10 h-10"
        />
      </a>
    {/each}
  </container>
</section>
