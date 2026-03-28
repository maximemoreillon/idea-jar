<script lang="ts">
  import { db } from "$lib/firebase";
  import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import DeleteIdeaButton from "$lib/components/deleteIdeaButton.svelte";

  let idea = $state<DocumentSnapshot>();
  let loading = $state(false);

  async function fetch_idea() {
    loading = true;
    const { id } = page.params; // same as const id = page.params.id
    if (!id) throw new Error("Missing ID");
    idea = await getDoc(doc(db, "ideas", id));
    loading = false;
  }

  onMount(fetch_idea);
</script>

<h2>Idea details</h2>

{#if loading}
  <div>Loading...</div>
{:else if idea}
  <p>
    Description: {idea.data()?.description || "Undescribed item"}
  </p>
  <p>
    Author: {idea.data()?.author || "Anonymous"}
  </p>

  <p>
    <DeleteIdeaButton id={idea.id} />
  </p>
{:else}
  <div>Error loading idea</div>
{/if}
