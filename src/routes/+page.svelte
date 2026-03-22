<script lang="ts">
  import { db } from "$lib/firebase";

  import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

  async function pick_idea() {
    const querySnapshot = await getDocs(collection(db, "ideas"));

    const docs = querySnapshot.docs;
    const number_of_items_in_jar = docs.length;

    if (number_of_items_in_jar < 1) return alert("Jar is empty");
    const random_index = Math.floor(Math.random() * number_of_items_in_jar);

    const random_doc = docs[random_index];

    alert(`${random_doc.data().description}`);

    if (confirm("Remove idea from jar?")) {
      alert("OK, the idea will be removed from the jar");
      await deleteDoc(doc(db, "ideas", random_doc.id));
    }

    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  }
</script>

<h1>Idea Jar</h1>
<p>
  <!-- <a href="/ideas">My ideas</a> -->
  <a href="/ideas/new">Add an idea</a>
</p>

<button onclick={pick_idea}>Pick an idea from the jar</button>
