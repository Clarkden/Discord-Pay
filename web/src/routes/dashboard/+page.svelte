<script lang="ts">
  import DashboardNavbar from "$lib/components/navigation/DashboardNavbar.svelte";
  import axios from "axios";

  export let data: any;
  $: ({ user } = data);

  const getGuilds = async () => {
    try {
      const res = await axios.get("/api/discord/getGuilds");
      const guilds = res.data;

      console.log(res);

      if (res.status === 200) {
        return guilds;
      } else {
        throw new Error(guilds);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
</script>

<DashboardNavbar />

<section class="p-5 flex flex-grow flex-col gap-4">
  <h1>Hi <span class="first-letter:uppercase">{user.username}!</span></h1>
  <container class="flex flex-row flex-wrap gap-2">
    {#if user.role === "" || user.role == "free"}
      <a
        href="/dashboard/upgrade"
        class="w-[300px] h-[150px] border border-black rounded-md flex flex-col items-start p-2 justify-between hover:bg-sky-50"
      >
        <h1>Upgade to Premium</h1>
      </a>
    {/if}
  </container>
  <container class="flex flex-col gap-3">
    {#await getGuilds()}
      <div
        class="w-full h-[150px] border border-black rounded-md flex flex-col items-start p-2 justify-between hover:bg-sky-50 animate-pulse bg-gray-100"
      />
      <div
        class="w-full h-[150px] border border-black rounded-md flex flex-col items-start p-2 justify-between hover:bg-sky-50 animate-pulse bg-gray-100"
      />
    {:then guilds}
      {#each guilds as guild (guild.id)}
        <a
          href="/dashboard/guilds/{guild.id}"
          class="w-full h-fit border border-black rounded-md flex flex-row items-center p-2 justify-start hover:bg-sky-50 gap-3"
        >
          <img
            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
            alt="Guild Icon"
            class="w-10 h-10"
          />
          <h1>{guild.name}</h1>
          <!-- <p>{guild.id}</p> -->
        </a>
      {/each}
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </container>
</section>
