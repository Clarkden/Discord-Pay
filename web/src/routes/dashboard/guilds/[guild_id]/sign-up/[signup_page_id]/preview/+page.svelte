<script lang="ts">
  import { page } from "$app/stores";
  import { pb } from "$lib/db/pocketbaseConnection";

  let signupPage: any;

  const getPreview = async () => {
    try {
      const data = await pb
        .collection("signup_pages")
        .getOne($page.params.signup_page_id);
      signupPage = data;
    } catch (err) {
      console.log(err);
    }
  };

  signupPage = getPreview();
</script>

{#await signupPage}
  <h1>Loading</h1>
{:then page}
  {JSON.stringify(page)}
{:catch err}
  {err}
{/await}
