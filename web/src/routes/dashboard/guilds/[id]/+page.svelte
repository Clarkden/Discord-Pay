<script lang="ts">
  import DashboardNavbar from "$lib/components/navigation/DashboardNavbar.svelte";
  import { page } from "$app/stores";
</script>

<DashboardNavbar />
<container class="flex flex-grow flex-col gap-3">
  {$page.params.id}
</container>
