<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    get_ideas_of_author,
    pick_random_author,
    random_number_between_0_and,
  } from "$lib";
  import IdeasCount from "$lib/components/ideasCount.svelte";
  import { ideas_collection } from "$lib/firebase";

  import { getDocs } from "firebase/firestore";
  import { sineIn } from "svelte/easing";

  let fetching = $state(false);

  async function pick_idea() {
    fetching = true;
    const database_fetch_result = await getDocs(ideas_collection); // Query the database
    fetching = false;

    const database_records = database_fetch_result.docs; // Get the records (items) from the database query result

    if (database_records.length < 1) {
      alert("Jar is empty");
      return; // Stop execution
    }

    // STEP 1: pick one author
    const picked_author = pick_random_author(database_records);

    // STEP 2: get ideas of that author
    const items_of_picked_author = get_ideas_of_author(
      database_records,
      picked_author,
    );

    const number_of_ideas = items_of_picked_author.length;

    // Deal with cases where there are no ideas
    if (number_of_ideas < 1) {
      alert("User has no idea");
      return; // Stop execution
    }

    // STEP 3: Pick a random idea from that of the picked author
    const picked_idea_index = random_number_between_0_and(number_of_ideas);
    const picked_idea = database_records[picked_idea_index];

    // Finally, move to the page of the idea
    goto(`/ideas/${picked_idea.id}`);
  }
</script>

<h2>Jar</h2>

<IdeasCount />

<p>
  <button onclick={pick_idea} disabled={fetching}>
    Pick an idea from the jar
  </button>
</p>
