<script lang="ts">
  import DashboardNavbar from "$lib/components/navigation/DashboardNavbar.svelte";
  import axios from "axios";
  import discordIcon from "$lib/assets/images/discord-icon.svg";
  import { page } from "$app/stores";
  import { twMerge } from "tailwind-merge";

  export let data: any;
  $: ({ user } = data);

  const getGuilds = async () => {
    if (!user) return;

    console.log("Getting Guilds");

    try {
      const res = await axios.get("/api/discord/getGuilds");
      //   console.log(res);
      const guilds = res.data;

      //   console.log(res);

      if (res.status === 200) {
        return guilds;
      } else {
        throw new Error(guilds);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };
</script>

<section class="h-screen flex flex-col">
  <DashboardNavbar />

  <div class="flex-grow">
    <div
      class=" grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5 md:h-[100%]"
    >
      <!-- <div class="flex flex-row flex-wrap gap-2">
        {#if user.role === "" || user.role == "free"}
          <a
            href="/dashboard/upgrade"
            class="w-[300px] h-[150px] border border-black rounded-md flex flex-col items-start p-2 justify-between hover:bg-indigo-50"
          >
            <h1>Upgade to Premium</h1>
          </a>
        {/if}
      </div> -->
      <div
        class="flex flex-col flex-1 gap-3 col-span-1 transition-transform flex-grow md:border-r md:border-black p-2 md:p-5 max-h-[150px] border-b border-black md:max-h-screen overflow-y-scroll"
      >
        {#await getGuilds()}
          <div
            class="w-full h-[150px] border border-black rounded-md flex flex-col items-start p-2 justify-between hover:bg-indigo-50 animate-pulse bg-gray-100"
          />
          <div
            class="w-full h-[150px] border border-black rounded-md flex flex-col items-start p-2 justify-between hover:bg-indigo-50 animate-pulse bg-gray-100"
          />
        {:then guilds}
          <!-- <h1>Guilds</h1> -->
          {#if guilds.length > 0}
            {#each guilds as guild (guild.id)}
              <a
                href="/dashboard/guilds/{guild.id}"
                class={twMerge(
                  "w-full h-fit border border-black rounded-md flex flex-row items-center p-2 justify-start gap-3 font-base text-lg",
                  guild.id === $page.params.guild_id
                    ? "bg-indigo-400 text-white"
                    : "bg-white hover:bg-indigo-200 text-black"
                )}
              >
                <img
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                  alt="Guild Icon"
                  class="w-10 h-10 bg-white rounded-md border border-black p-1"
                />
                <h1>{guild.name}</h1>
                <!-- <p>{guild.id}</p> -->
              </a>
            {/each}
          {/if}
          <a
            href="https://discord.com/api/oauth2/authorize?client_id=1132093916896829560&permissions=8&redirect_uri=https%3A%2F%2Fdiscord-pay.fly.dev%2Fapi%2Foauth2-redirect&response_type=code&scope=identify%20guilds%20bot%20applications.commands"
            class="w-full h-fit border border-black rounded-md flex flex-row items-center p-2 justify-start gap-3 font-base text-lg hover:bg-indigo-200"
          >
            <img
              src={discordIcon}
              alt="Guild Icon"
              class="w-10 h-10 bg-white rounded-md border border-black p-1"
            />
            <h1 class="">Add to New Guild</h1>
            <!-- <p>{guild.id}</p> -->
          </a>
        {:catch error}
          <!-- <p>{error.message}</p> -->
          <div
            class="w-full h-fit border border-red-600 rounded-md flex flex-row items-center p-2 justify-start gap-3 font-base text-lg hover:bg-indigo-200"
          >
            <img
              src={discordIcon}
              alt="Guild Icon"
              class="w-10 h-10 bg-white rounded-md border border-black p-1"
            />
            <h1 class="">Couldn't Fetch Guilds</h1>
            <!-- <p>{guild.id}</p> -->
          </div>
        {/await}
      </div>
      <div
        class="p-2 md:p-5 col-span-1 md:col-span-3 lg:col-span-4 flex flex-grow flex-col gap-3 items-start justify-start overflow-y-scroll"
      >
        <slot />
      </div>
    </div>
  </div>
</section>
