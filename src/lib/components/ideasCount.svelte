<script lang="ts">
  import { db } from "$lib/firebase";
  import { collection, onSnapshot, query } from "firebase/firestore";
  import { onMount } from "svelte";

  type UserIdeaCountRecord = { name: string; ideaCount: number };
  let users = $state<UserIdeaCountRecord[]>([]);
  let loading = $state(true);

  const subscribeToIdeas = () => {
    const collectionRef = collection(db, "ideas");
    const q = query(collectionRef);

    onSnapshot(q, async ({ docs }) => {
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
  <span> The Jar contains </span>
  {#each users as user}
    <span>
      {user.ideaCount} idea(s) from {user.name},
    </span>
  {/each}
</div>
