<script lang="ts">
  import type { Person, TopLevelEntry } from "./hayagriva";

  const { entry, id }: { entry: TopLevelEntry; id: string } = $props();
  const { title, "page-range": pages } = $derived(entry);

  const startPage = $derived.by(() => {
    if (!pages) return undefined;
    if (pages.toString().includes("-"))
      return pages.toString().split("-").at(0);
    return pages.toString();
  });

  const url = $derived(
    typeof entry.url === "string" ? entry.url : entry.url?.value
  );

  function enhanceUrl(url: string | undefined): string | undefined {
    if (!url) return url;

    const { pathname, hostname, hash } = new URL(url);
    if (!hash && startPage) {
      return enhanceUrl(url + `#page=${startPage}`);
    }

    if (hostname === "arxiv.org" && pathname.startsWith("/abs/")) {
      return url.replace("/abs/", "/pdf/");
    }

    return url;
  }

  function displayPerson(person: Person) {
    if (typeof person === "string") return person;

    const { name, "given-name": givenName, alias, prefix, suffix } = person;
    return [prefix, givenName, name, alias && `a.k.a. ${alias}`, suffix]
      .filter(Boolean)
      .join(" ");
  }

  const authors = $derived(
    entry.author
      ? Array.isArray(entry.author)
        ? entry.author.map(displayPerson).join("; ")
        : displayPerson(entry.author)
      : ""
  );
</script>

<a target="_blank" href={enhanceUrl(url)} {id}>
  {#if !url}
    <span class="no-link">No link</span>
  {/if}
  <h2>
    {#if title}
      {title}
    {:else}
      <code title="No title!">@{id}</code>
    {/if}
  </h2>
  <p>{authors}</p>
</a>

<style>
  a {
    display: flex;
    flex-direction: column;
    border-radius: 1em;
    box-shadow:
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12),
      0 1px 5px 0 rgba(0, 0, 0, 0.2);
    padding: 2em;
    gap: 0.5em;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid transparent;
    overflow: hidden;
    height: 12rem;
  }

  a:hover,
  a:focus-visible {
    box-shadow:
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12),
      0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  a:focus-visible {
    border-color: cyan;
  }


  h2 {
    line-height: 1;
    -webkit-line-clamp: 4;
    text-wrap: balance;
    line-clamp: 4;
  }

  p {
    -webkit-line-clamp: 2;
    line-clamp: 2;
    white-space: nowrap;
  }
  a * {
    margin: 0;
    padding: 0;
    color: black;
    font-family: var(--font-sans);
    text-overflow: ellipsis;
    overflow: hidden;
  }

  code {
    font-family: var(--font-mono);
  }

  .no-link {
    color: red;
    text-transform: uppercase;
  }
</style>
