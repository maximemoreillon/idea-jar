<script lang="ts">
  import { goto } from "$app/navigation";
  import IdeasCount from "$lib/components/ideasCount.svelte";
  import { db } from "$lib/firebase";

  import { collection, getDocs, query, where } from "firebase/firestore";

  let picking = $state(false);

  function random_number_between_0_and(x: number) {
    return Math.floor(Math.random() * x);
  }

  async function pick_idea() {
    picking = true;

    // Generate database query
    const database_query = query(collection(db, "ideas"));

    // Use the query to fetch "ideas" collection in the database
    const database_fetch_result = await getDocs(database_query);

    // Get the records (items) from the database query
    const database_records = database_fetch_result.docs;

    // STEP 1: pick one author

    // This bit looks complicated but it just make a list of distinct idea authors
    const distinct_authors = [
      ...new Set(database_records.map((r) => r.data().author)),
    ];

    const number_of_authors = distinct_authors.length;
    const random_author_index = random_number_between_0_and(number_of_authors);
    const picked_author = distinct_authors[random_author_index];

    // STEP 2: pick one random idea of that author

    // Filter out ideas that are not from the picked author and that are not picked yet
    const items_of_picked_author = database_records.filter(
      (d) => d.data().author === picked_author && !d.data(),
    );

    const number_of_ideas = items_of_picked_author.length;

    if (number_of_ideas < 1) return alert("Jar is empty");

    const picked_idea_index = random_number_between_0_and(number_of_ideas);
    const picked_idea = database_records[picked_idea_index];

    goto(`/ideas/${picked_idea.id}`);

    picking = false;
  }
</script>

<h2>Jar</h2>

<IdeasCount />

<p>
  <a href="/ideas/new">Add an idea</a>
  <a href="/ideas">My ideas</a>
  <a href="/ideas?picked=true">Picked ideas</a>
</p>
<button onclick={pick_idea} disabled={picking}>Pick an idea from the jar</button
>
