<script lang="ts">
  import { page } from "$app/stores";
  import { logout } from "$lib/utils";
  import profile from "$lib/assets/images/standardUserImage.svg";
  import { createDropdownMenu } from "@melt-ui/svelte";
  import { writable } from "svelte/store";

  const { trigger, menu, item, separator } = createDropdownMenu();

  const hideMenu = writable(false);
</script>

<div
  class="flex flex-row justify-between items-center px-5 w-full h-14 top-0 border-b border-gray-300"
>
  <a href="/"><h1>Discord Pay</h1></a>
  <ul class="hidden md:flex flex-row gap-3">
    <button
      melt={$trigger}
      class="border border-gray-300 rounded-full w-10 h-10 overflow-hidden flex items-center justify-center hover:bg-sky-100 cursor-pointer"
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
</div>
