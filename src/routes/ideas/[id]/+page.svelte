<script lang="ts">
  import { auth, db } from "$lib/firebase";
  import { doc, getDoc, type DocumentData } from "firebase/firestore";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import MarkAsPickedButton from "$lib/components/markAsPickedButton.svelte";
  import DeleteIdeaButton from "$lib/components/deleteIdeaButton.svelte";

  // Not very clean as id not part of DocumentData
  let idea = $state<DocumentData>();
  let loading = $state(true);

  onMount(async () => {
    const { id } = page.params; // same as const id = page.params.id
    if (!id) throw new Error("Missing ID");
    const docSnap = await getDoc(doc(db, "ideas", id));
    if (!docSnap) throw new Error("Document not found");
    idea = { ...docSnap.data(), id: docSnap.id };
    loading = false;
  });
</script>

<h2>Idea</h2>

<p>
  <a href="/">Return to jar</a>
</p>

{#if loading}
  <div>Loading...</div>
{:else if idea}
  <p>
    <MarkAsPickedButton id={idea.id} />
  </p>

  <div>
    Description: {idea.description}
  </div>
  <div>
    Author: {idea.author}
  </div>

  {#if idea.author === auth.currentUser?.email}
    <!-- TODO: allow edit -->
    <p>
      <DeleteIdeaButton id={idea.id} />
    </p>
  {/if}
{:else}
  <div>Error loading idea</div>
{/if}
