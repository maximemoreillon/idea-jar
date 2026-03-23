<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { auth } from "$lib/firebase";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let authenticating = $state(true);

  onMount(() => {
    auth.onAuthStateChanged(async (user) => {
      authenticating = false;
      if (!user && page.route.id !== "/login") return goto("/login");
      if (user && page.route.id === "/login") return goto("/");
    });
  });
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <h1>Idea jar</h1>
  <nav>
    <a href="/">Jar</a>
    <a href="/ideas">My ideas</a>
    <a href="/ideas/new">Add idea</a>
  </nav>
</header>
<main>
  {#if authenticating}
    <div>Checking for authentication...</div>
  {:else}
    {@render children()}
  {/if}
</main>
