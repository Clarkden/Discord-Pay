<script lang="ts">
  import { onMount } from "svelte";
  import "../app.css";
  import { pb } from "$lib/db/connection";
  import axios from "axios";
  import { updateAuthStatus } from "$lib/utils";

  const update = async (token: string, model: any) => {
    await updateAuthStatus(token, model);
    window.location.replace("/dashboard");
  };

  onMount(() => {
    const removeListener = pb.authStore.onChange((token, model) => {
      if (token && model) {
        try {
          update(token, model);
        } catch (error) {
          console.log(error);
        }
      } else {
        pb.authStore.clear();
      }
    });

    return () => removeListener();
  });
</script>

<svelte:head>
  <!-- <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; img-src https://*; child-src 'none';"
  /> -->
</svelte:head>

<slot />
