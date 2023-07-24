<script lang="ts">
  import { loginWithDiscord } from "$lib/utils";
  import discordLogo from "$lib/assets/images/logo-discord.svg";
</script>

<button
  on:click={loginWithDiscord}
  class="w-full py-2 rounded-md border-2 border-black hover:bg-gray-100 transition duration-100 flex flex-row items-center justify-center"
>
  <img src={discordLogo} alt="Discord Logo" class="w-6 h-6 mr-2" />
  Sign in with Discord
</button>
