<script lang="ts">
  import { goto } from "$app/navigation";
  import { auth, db } from "$lib/firebase";

  import { addDoc, collection } from "firebase/firestore";

  let description = $state("");

  async function add_idea(event: Event) {
    event.preventDefault();

    const docRef = await addDoc(collection(db, "ideas"), {
      description,
      author: auth.currentUser?.email,
    });

    return goto(`/ideas/${docRef.id}`);
    // return goto(`/`);
  }
</script>

<h2>New idea</h2>

<form onsubmit={add_idea}>
  <label for="description">Description</label>
  <input type="text" id="description" bind:value={description} />
  <button type="submit">Submit</button>
</form>
