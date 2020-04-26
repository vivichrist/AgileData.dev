
<script>
  import { fly, slide } from 'svelte/transition';

  export let title = "";
  export let items = "";

  // split menu items string into pairs of arguments (name, url)
  let named_links = items.match(/\S+\s\S+\s?/g)
                         .map(x => x = x.trim()
                                        .split(' ')
                                        .map(t => t = t.replace('_',' ')) );
</script>

<!-- the triggering button for the menu dropdown -->
<button type="button" in transition:fly="{{y: -100, duration: 500}}"
    href="#" class="nav-link btn btn-primary py-3 m-0"
    id="{title}MenuButton"  aria-pressed="false"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  {title}
</button>
<!-- the menu that appears under the button -->
<div class="dropdown-menu bg-light" aria-labelledby="{title}MenuButton">
  {#each named_links as [ mname, link ] }
    {#if mname === "divider"}
      <div class="dropdown-divider"></div>
    {:else}
      <a class="dropdown-item text-dark"
              href={link}>
        {mname}
      </a>
    {/if}
  {/each}
</div>

<style>
  .btn:hover {
    text-shadow: 1px 1px 2px black;
  }
  .btn {
    border-radius: 0;
    box-sizing: border-box;
    z-index: 1;
  }
  @media screen and (min-width: 1260px) {
    .dropdown-item {
      font-size: 14pt;
    }
    .btn {
      font-size: 14pt;
    }
  }
  @media screen and (max-width: 1260px) {
    .dropdown-item {
      font-size: 12pt;
    }
    .btn {
      font-size: 12pt;
    }
  }
  @media screen and (max-width: 970px) {
    .dropdown-item {
      font-size: 11pt;
    }
    .btn {
      font-size: 11pt;
    }
  }
</style>
