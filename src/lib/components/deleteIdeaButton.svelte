<script lang="ts">
  import { goto } from "$app/navigation";
  import { db } from "$lib/firebase";
  import { deleteDoc, doc } from "firebase/firestore";

  let { id } = $props();
  let pending = $state(false);

  async function delete_idea() {
    if (!confirm("Delete idea?")) return;
    pending = true;
    await deleteDoc(doc(db, "ideas", id));
    goto("/");
    pending = false;
  }
</script>

<button onclick={delete_idea} disabled={pending}>Delete idea</button>
