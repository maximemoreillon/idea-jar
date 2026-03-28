<script lang="ts">
  import { auth, ideas_collection } from "$lib/firebase";

  import { DocumentSnapshot, getDocs, query, where } from "firebase/firestore";
  import { onMount } from "svelte";

  let ideas = $state<DocumentSnapshot[]>([]); // TODO: sensible typing
  let loading = $state(false);

  async function fetch_ideas() {
    loading = true;

    const database_query = query(
      ideas_collection,
      where("author", "==", auth.currentUser?.email), // Only query the ideas of the user currently logged in
    );
    const query_snapshot = await getDocs(database_query);
    ideas = query_snapshot.docs;
    loading = false;
  }

  onMount(fetch_ideas);
</script>

<h2>Ideas</h2>

{#if loading}
  <div>Loading ...</div>
{:else if ideas.length > 0}
  <ul>
    {#each ideas as idea}
      <li>
        <a href={`/ideas/${idea.id}`}>
          {idea.data()?.description || "Undescribed item"}
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <div>No idea</div>
{/if}
