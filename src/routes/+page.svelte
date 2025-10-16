<script lang="ts">
  import Entry from "$lib/Entry.svelte";
  import { entries } from "./bib.remote";

  let path: string = $state("/home/glebihan/internships/bib.yaml");
</script>

<header>
  <h1>Homebib :]</h1>
  <input
    type="text"
    value={path}
    onblur={({ target }) => {
      if (!(target instanceof HTMLInputElement)) return;
      path = target.value;
    }}
  />
</header>

<main>
  {#each await entries() as { id, ...entry } (id)}
    <Entry {id} {entry} />
  {/each}
</main>

<style>
  header {
    text-align: center;
    padding: 3rem 0;
  }
  header input {
    font-size: 1.2em;
    border: none;
    font-family: monospace;
    border-bottom: 2px solid black;
    width: 500px;
  }

  main {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    max-width: 1000px;
    margin: 2em auto;
    gap: 1em;
  }
</style>
