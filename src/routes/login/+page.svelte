<script lang="ts">
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { auth, googleProvider } from "$lib/firebase";

  // https://firebase.google.com/docs/auth/web/google-signin
  async function login() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) throw new Error("Missing crednetials");
    } catch (error: any) {
      alert("Login failed");
    }
  }
</script>

<button onclick={login}>Login with google</button>
