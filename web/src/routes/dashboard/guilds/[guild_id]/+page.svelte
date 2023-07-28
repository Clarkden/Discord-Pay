<script lang="ts">
  import { page } from "$app/stores";
  import axios from "axios";

  // $: if ($page.params.id !== undefined) {
  //   guild = getGuildData();
  // }

  // const getGuildData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `/api/discord/getGuild?id=${$page.params.id}`
  //     );

  //     const guild = res.data;

  //     if (res.status === 200) {
  //       return guild;
  //     } else {
  //       throw new Error(guild);
  //     }
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };

  // let guild = getGuildData();
</script>

<div class="flex flex-col flex-grow w-full">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 grid-flow-row">
    <div class="col-span-1 flex flex-col gap-2">
      <h1>Signup Pages</h1>
      <a
        href={`/dashboard/guilds/${$page.params.guild_id}/sign-up/create`}
        class="w-full border border-black rounded-md p-2 hover:bg-indigo-50 flex flex-row gap-2 items-center justify-center"
        >Create New
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-circle-plus"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 12l6 0" />
          <path d="M12 9l0 6" />
        </svg>
      </a>
    </div>
  </div>
  <!-- {#await guild then guild}
    {#each guild.roles as role (role.id)}
      <p>{role.name}</p>
    {/each}
  {:catch}
    <h1>Something went wrong</h1>
  {/await} -->
</div>
