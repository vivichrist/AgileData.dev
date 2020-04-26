<script>
  import { fly } from 'svelte/transition';

  export let title = "";
  export let items = "";

  // split menu items string into pairs of arguments (name, url)
  let named_links = items.match(/\S+\s\S+\s?/g)
                         .map(x => x = x.trim()
                                        .split(' ')
                                        .map(t => t = t.replace('_',' ')) );
</script>
<!-- the triggering button for the menu dropdown -->
<div class="nav-item btn-group">
  <button type="button" in transition:fly="{{x: -200, duration: 800}}"
          class="btn btn-dark dropdown-toggle my-3 mx-3"
          id="{title}MenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {title}
  </button>
  <!-- the menu that appears under the button -->
  <div class="dropdown-menu" aria-labelledby="{title}MenuButton">
    {#each named_links as [ mname, link ] }
      {#if mname === "divider"}
        <div class="dropdown-divider text-dark"></div>
      {:else}
        <a class="dropdown-item" role="button"
             href="{link}">
          {mname}
        </a>
      {/if}
    {/each}
  </div>
</div>

<style>
  .btn {
    box-sizing: border-box;
    z-index: 1;
  }
  @media screen and (min-width: 1200px) {
    .dropdown-item {
      font-size: 14pt;
    }
    .btn {
      font-size: 14pt;
    }
  }
  @media screen and (max-width: 1200px) {
    .dropdown-item {
      font-size: 12pt;
    }
    .btn {
      font-size: 12pt;
    }
  }
  @media screen and (max-width: 930px) {
    .dropdown-item {
      font-size: 11pt;
    }
    .btn {
      font-size: 11pt;
    }
  }
</style>
