<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=Martian+Mono:wght@100..800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{@render children?.()}

<style>
  :global(:root) {
    --font-mono: "Martian Mono";
    --font-sans: "Host Grotesk";
  }

  :global(body) {
    font-family: var(--font-sans);
  }
</style>
