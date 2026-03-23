<script lang="ts">
  import { ideas_collection } from "$lib/firebase";
  import { onSnapshot, query } from "firebase/firestore";
  import { onMount } from "svelte";

  type UserIdeaCountRecord = { name: string; ideaCount: number };
  let users = $state<UserIdeaCountRecord[]>([]);
  let loading = $state(true);

  const subscribeToIdeas = () => {
    const database_query = query(ideas_collection);

    onSnapshot(database_query, async ({ docs }) => {
      users = docs.reduce((acc: UserIdeaCountRecord[], doc) => {
        const name = doc.data().author;
        const foundAuthorIndex = acc.findIndex((r) => r.name === name);
        if (foundAuthorIndex > -1) acc[foundAuthorIndex].ideaCount++;
        else acc.push({ name, ideaCount: 1 });
        return acc;
      }, []);
      loading = false;
    });
  };

  onMount(() => {
    subscribeToIdeas();
  });
</script>

<div>
  {#if loading}
    <div>Loading jar content...</div>
  {:else if users.length > 0}
    <span> The jar contains </span>
    {#each users as user}
      <span>
        {user.ideaCount} idea(s) from {user.name},
      </span>
    {/each}
  {:else}
    <div>Jar is empty</div>
  {/if}
</div>
