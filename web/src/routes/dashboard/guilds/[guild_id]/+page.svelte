<script lang="ts">
  import { page } from "$app/stores";
  import { pb } from "$lib/db/pocketbaseConnection";
  import { onMount } from "svelte";

  let signupPages: any;

  const getSignupPages = async () => {
    try {
      const signupPages = pb.collection("signup_pages").getList(1, 4, {
        filter: `guild_id="${$page.params.guild_id}"`,
      });

      return signupPages;

      // if (signupPages === 200) {
      //   return channels;
      // } else {
      //   throw new Error(channels);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  onMount(async () => {
    signupPages = await getSignupPages();
  });

  $: if ($page.params.guild_id) {
    signupPages = getSignupPages();
  }
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
      {#await signupPages}
        <div
          class="w-full border border-black rounded-md p-2 hover:bg-indigo-50 flex flex-row gap-2 items-center justify-center animate-pulse"
        >
          Loading
        </div>
        <div
          class="w-full border border-black rounded-md p-2 hover:bg-indigo-50 flex flex-row gap-2 items-center justify-center animate-pulse"
        >
          Loading
        </div>
      {:then signupPages}
        {#each signupPages.items as signupPage (signupPage.id)}
          <div>
            <a
              href={`/dashboard/guilds/${$page.params.guild_id}/sign-up/${signupPage.id}/preview`}
              class="w-full border border-black rounded-md p-2 hover:bg-indigo-50 flex flex-row gap-2 items-center justify-center"
              >{signupPage.mint_name || "Untitled"}
              <span class="text-indigo-500">{signupPage.draft ? "(Draft)" : ""}</span>
            </a>
          </div>
        {/each}
        {#if signupPages.items.length > 3}
          <div>
            <a
              href={`/dashboard/guilds/${$page.params.guild_id}/sign-up/view-all`}
              class="w-full border border-black rounded-md p-2 hover:bg-indigo-50 flex flex-row gap-2 items-center justify-center"
              >View All
            </a>
          </div>
        {/if}
      {/await}
    </div>
  </div>
</div>
