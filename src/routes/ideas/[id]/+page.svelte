<script lang="ts">
  import { db } from "$lib/firebase";
  import { doc, getDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import DeleteIdeaButton from "$lib/components/deleteIdeaButton.svelte";

  let idea = $state<any>(); // TODO: typing
  let loading = $state(false);

  async function fetch_idea() {
    loading = true;
    const { id } = page.params; // same as const id = page.params.id
    if (!id) return alert("Missing ID");
    idea = await getDoc(doc(db, "ideas", id));
    loading = false;
  }

  onMount(fetch_idea);
</script>

<h2>Idea details</h2>

{#if loading}
  <div>Loading...</div>
{:else if idea}
  <div>
    Description: {idea.data().description}
  </div>
  <div>
    Author: {idea.data().author}
  </div>

  <p>
    <DeleteIdeaButton id={idea.id} />
  </p>
{:else}
  <div>Error loading idea</div>
{/if}
