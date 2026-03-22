<script lang="ts">
  import { db } from "$lib/firebase";

  import { collection, getDocs } from "firebase/firestore";

  async function test() {
    const querySnapshot = await getDocs(collection(db, "test"));

    console.log(querySnapshot.docs[1].data());

    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>

<button onclick={test}>Test</button>
