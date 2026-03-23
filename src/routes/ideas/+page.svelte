<script lang="ts">
  import { auth, db } from "$lib/firebase";

  import { collection, getDocs, query, where } from "firebase/firestore";
  import { onMount } from "svelte";
  import { page } from "$app/state";

  let ideas = $state<any[]>([]);
  let loading = $state(false);
  const query_picked = page.url.searchParams.get("picked");

  async function fetch_ideas() {
    loading = true;
    const filter = query_picked
      ? where("picked", "==", true)
      : where("author", "==", auth.currentUser?.email);

    const database_query = query(collection(db, "ideas"), filter);
    const query_snapshot = await getDocs(database_query);
    ideas = query_snapshot.docs;
    loading = false;
  }

  onMount(fetch_ideas);
</script>

<h2>Ideas</h2>

{#if query_picked}
  <p>Showing items picked out of the jar</p>
{:else}
  <p>
    Showing items of user {auth.currentUser?.email}
  </p>
{/if}

<p>
  <a href="/">Return</a>
</p>

{#if loading}
  <div>Loading ...</div>
{:else if ideas.length > 0}
  <ul>
    {#each ideas as idea}
      <li>
        <a href={`/ideas/${idea.id}`}
          >{idea.data().description}
          {idea.data().picked ? "(Out of jar)" : "(In jar)"}</a
        >
      </li>
    {/each}
  </ul>
{:else}
  <div>No idea</div>
{/if}
