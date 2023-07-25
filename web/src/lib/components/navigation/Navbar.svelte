<script lang="ts">
  import { page } from "$app/stores";
</script>

<div
  class="flex flex-row justify-between items-center px-5 w-full h-14 top-0 border-b border-black"
>
  <a href="/"><h1>Discord Pay</h1></a>
  <ul class="hidden md:flex flex-row gap-3">
    {#if $page.data.user}
      <a href="/dashboard">Dashboard</a>
    {:else if !$page.url.pathname.includes("/login")}
      <a href="/login">Login</a>{/if}
  </ul>
</div>
