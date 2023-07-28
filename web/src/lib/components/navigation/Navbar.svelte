<script lang="ts">
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";

  let hideMobileNav = true;
</script>

<div
  class="flex flex-row justify-between items-center px-5 w-full h-18 min-h-[56px] top-0 border-b border-black relative"
>
  <a href="/"><h1 class="font-bold">ServerMint</h1></a>
  <ul class="hidden md:flex flex-row gap-3">
    {#if $page.data.user}
      <a href="/dashboard">Dashboard</a>
    {:else if !$page.url.pathname.includes("/login")}
      <a href="/login">Login</a>{/if}
  </ul>
  <button class="md:hidden" on:click={() => (hideMobileNav = !hideMobileNav)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-black"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {#if hideMobileNav}
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      {:else}
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      {/if}
    </svg>
  </button>
  {#if !hideMobileNav}
    <ul
      class="flex md:hidden flex-col gap-3 absolute top-14 left-0 right-0 p-5 bg-indigo-400 text-white font-semibold border-b-black border-b"
      in:slide
      out:slide
    >
      {#if $page.data.user}
        <li><a href="/dashboard">Dashboard</a></li>
      {:else if !$page.url.pathname.includes("/login")}
        <li><a href="/login">Login</a></li>{/if}
    </ul>
  {/if}
</div>
