<script lang="ts">
  import { goto } from "$app/navigation";
  import { db } from "$lib/firebase";
  import { doc, setDoc } from "firebase/firestore";

  let { id } = $props();
  let pending = $state(false);

  async function mark_as_picked() {
    if (!confirm("Take out of the jar")) return;
    pending = true;
    const countdownDoc = doc(db, "ideas", id);
    await setDoc(countdownDoc, { picked: true }, { merge: true });
    goto("/");
    pending = false;
  }
</script>

<button onclick={mark_as_picked} disabled={pending}>Take out of the jar</button>
