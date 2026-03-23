<script lang="ts">
  import { auth, db } from "$lib/firebase";

  import { collection, getDocs, query, where } from "firebase/firestore";
  import { onMount } from "svelte";

  let ideas = $state<any[]>([]);
  let loading = $state(false);

  async function fetch_ideas() {
    loading = true;

    const database_query = query(
      collection(db, "ideas"),
      where("author", "==", auth.currentUser?.email),
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
        <a href={`/ideas/${idea.id}`}>{idea.data().description} </a>
      </li>
    {/each}
  </ul>
{:else}
  <div>No idea</div>
{/if}
