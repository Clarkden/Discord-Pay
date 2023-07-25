<script lang="ts">
  import DashboardNavbar from "$lib/components/navigation/DashboardNavbar.svelte";
//   import { checkBotInServer } from "$lib/utils";
  import { onMount } from "svelte";

  export let data: any;
  $: ({ user } = data);

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
</section>
