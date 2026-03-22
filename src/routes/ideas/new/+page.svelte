<script lang="ts">
  import { goto } from "$app/navigation";
  import { auth, db } from "$lib/firebase";

  import { addDoc, collection } from "firebase/firestore";

  const user_data = $state({
    // name: "",
    description: "",
  });

  async function add_idea(event: Event) {
    event.preventDefault();

    const docRef = await addDoc(collection(db, "ideas"), {
      ...user_data,
      author: auth.currentUser?.email,
    });

    // return goto(`/ideas/${docRef.id}`);
    return goto(`/`);
  }
</script>

<h2>New idea</h2>
<p>
  <a href="/">Return</a>
</p>
<form onsubmit={add_idea}>
  <!-- <div>
    <label for="name">Idea</label>
    <input type="text" id="name" bind:value={user_data.name} />
  </div> -->
  <!-- <div> -->
  <label for="description">Description</label>
  <input type="text" id="description" bind:value={user_data.description} />
  <!-- </div> -->
  <button type="submit">Submit</button>
</form>
