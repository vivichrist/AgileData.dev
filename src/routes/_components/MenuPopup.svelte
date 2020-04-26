<script>
  export let items = "";

  // split items string into pairs of arguments (name, url)
  let named_links = items.match(/\S+\s\S+\s?/g)
                     .map(x => x = x.trim()
                                    .split(' ')
                                    .map(t => t = t.replace('_',' ')));

</script>

<div role="button"
     class="btn" data-toggle="dropdown"
     aria-haspopup="true" aria-expanded="false">
  <slot>?</slot>
</div>

<!-- the menu that appears under the button -->
<div class="dropdown-menu mt-3 ml-3">
  {#each named_links as [ mname, link ] }
    {#if mname === "divider"}
      <div class="dropdown-divider text-dark"></div>
    {:else}
      <a class="dropdown-item" role="button" href="{link}">
        {mname}
      </a>
    {/if}
  {/each}
</div>

<style>
  @media screen and (min-width: 1200px) {
    .dropdown-item {
      font-size: 14pt;
    }
    .btn {
      font-size: 14pt;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  @media screen and (max-width: 1200px) {
    .dropdown-item {
      font-size: 12pt;
    }
    .btn {
      font-size: 12pt;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
  }
  @media screen and (max-width: 930px) {
    .dropdown-item {
      font-size: 11pt;
    }
    .btn {
      font-size: 10pt;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>
