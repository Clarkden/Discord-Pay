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
  class="flex flex-row justify-between items-center px-5 w-full h-14 min-h-[56px] top-0 border-b border-black"
>
  <a href="/"><h1 class="font-bold">Discord Pay</h1></a>
  <ul class="hidden md:flex flex-row gap-3">
    <button
      melt={$trigger}
      class="border border-black rounded-full w-10 h-10 overflow-hidden flex items-center justify-center hover:bg-sky-100 cursor-pointer"
    >
      <img
        src={$page.data.user.avatar || profile}
        alt="Avatar"
        class="object-center max-w-7 max-h-7"
      />
    </button>
    <div
      melt={$menu}
      class="bg-white rounded-md p-2 border-2 border-gray-200 drop-shadow-md flex flex-col gap-2"
    >
      <a
        href="/dashboard/profile"
        melt={$item}
        class="w-full py-1 px-2 rounded-md hover:bg-sky-100 transition"
      >
        Profile
      </a>
      <a
        href="/dashboard/settings"
        melt={$item}
        class="w-full py-1 px-2 rounded-md hover:bg-sky-100 transition"
      >
        Settings
      </a>
      <div melt={$item}>
        <button
          on:click={logout}
          class="bg-rose-500 hover:bg-rose-600 rounded-md w-full px-2 py-1 text-white"
          >Logout</button
        >
      </div>
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
