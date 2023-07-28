<script lang="ts">
  import { page } from "$app/stores";
  import { logout } from "$lib/utils";
  import profile from "$lib/assets/images/standardUserImage.svg";
  import { createDropdownMenu } from "@melt-ui/svelte";
  import { slide } from "svelte/transition";

  const { trigger, menu, item } = createDropdownMenu();
  let hideMobileNav = true;
</script>

<div
  class="flex flex-row justify-between items-center px-5 w-full h-18 min-h-[56px] top-0 border-b border-black"
>
  <a href="/"><h1 class="font-bold">ServerMint</h1></a>
  <ul class="hidden md:flex flex-row gap-3 items-center">
    <a
      href="/dashboard/profile"
      class="w-full py-1 px-2 rounded-md hover:bg-sky-100 transition"
    >
      Profile
    </a>
    <a
      href="/dashboard/settings"
      class="w-full py-1 px-2 rounded-md hover:bg-sky-100 transition"
    >
      Settings
    </a>
    <div>
      <button
        on:click={logout}
        class="w-full py-1 px-2 rounded-md hover:bg-red-100 transition"
        >Logout</button
      >
    </div>
    <!-- <ul>
            <li><button on:click={logout}>Logout</button></li>
        </ul> -->
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
      <li><a href="/dashboard/profile">Profile</a></li>
      <li><a href="/dashboard/settings">Settings</a></li>
      <li><button on:click={logout}>Logout</button></li>
    </ul>
  {/if}
</div>
