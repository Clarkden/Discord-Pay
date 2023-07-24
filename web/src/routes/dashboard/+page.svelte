<script lang="ts">
  import DashboardNavbar from "$lib/components/navigation/DashboardNavbar.svelte";

  export let data: any;
  $: ({ user } = data);
</script>

<DashboardNavbar />

<section class="p-5 flex-grow">
  <container class="flex flex-row flex-wrap gap-2">
    <a
      href="https://discord.com/api/oauth2/authorize?client_id=1132093916896829560&permissions=8&redirect_uri=https%3A%2F%2Fdiscord-pay.fly.dev%2Fapi%2Foauth2-redirect&response_type=code&scope=role_connections.write%20bot"
      class="w-[300px] h-[150px] border border-gray-300 rounded-md flex flex-col items-start p-2 justify-between hover:bg-sky-50"
    >
      <h1>Add Bot to Server</h1>
    </a>
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
