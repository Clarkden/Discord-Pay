<script lang="ts">
  import { page } from "$app/stores";
  import axios from "axios";

  $: if ($page.params.id !== undefined) {
    guild = getGuildData();
  }

  const getGuildData = async () => {
    try {
      const res = await axios.get(
        `/api/discord/getGuild?id=${$page.params.id}`
      );

      const guild = res.data;

      if (res.status === 200) {
        return guild;
      } else {
        throw new Error(guild);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  let guild = getGuildData();
</script>

<div class="flex flex-col overflow-y-scroll">
  {#await guild then guild}
    {#each guild.roles as role (role.id)}
      <p>{role.name}</p>
    {/each}
  {:catch}
    <h1>Something went wrong</h1>
  {/await}

  {$page.params.id}
</div>
