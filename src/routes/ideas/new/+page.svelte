<script lang="ts">
  import { goto } from "$app/navigation";
  import { auth, ideas_collection } from "$lib/firebase";
  import { addDoc } from "firebase/firestore";

  let description = $state("");

  async function add_idea(event: Event) {
    event.preventDefault(); // Override the web browser's default behavior on form submission

    const created_idea = await addDoc(ideas_collection, {
      description,
      author: auth.currentUser?.email,
    });

    return goto(`/ideas/${created_idea.id}`); // Go to the newly created idea's detail page
  }
</script>

<h2>New idea</h2>

<form onsubmit={add_idea}>
  <label for="description">Description</label>
  <input type="text" id="description" bind:value={description} />
  <button type="submit">Submit</button>
</form>
