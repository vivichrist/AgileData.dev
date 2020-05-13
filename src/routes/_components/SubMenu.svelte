<script>
  import { filterstr } from "../../stores.js";
  export let topics = [];
</script>

<ul class="nav sticky-top vw-100 nav-fill bg-white border-bottom border-ternary">
  <li class="nav-item dropdown">
    <div class="nav-link under-dark dropdown-toggle" role="button"
         id="subMenuAllTopics" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false">
      All Topics
    </div>
    <div class="dropdown-menu" aria-labelledby="subMenuAllTopics">
    {#each topics as item}
      <a class="dropdown-item" on:click={() => $filterstr = item}
        href="app/catalog">{item}</a>
    {:else}
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    {/each}
    </div>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        on:click={() => $filterstr = "topics"}
        href="app/catalog">Topics</a>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        on:click={() => $filterstr = "consume"}
        href="app/catalog">Consume</a>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        on:click={() => $filterstr = "event"}
        href="app/catalog">Events</a>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        on:click={() => $filterstr = "concept"}
        href="app/catalog">Concepts</a>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        on:click={() => $filterstr = "detail"}
        href="app/catalog">Details</a>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        on:click={() => $filterstr = "history"}
        href="app/catalog">History</a>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        href="app/catalog">Recently Added</a>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        href="app/catalog">Most Viewed</a>
  </li>
  <li class="nav-item">
    <a role="button" class="nav-link under-dark"
        on:click={() => $filterstr = "reset"}
        href="app/catalog">My Lists</a>
  </li>
</ul>

<style>
  ul {
    top: 4.5rem;
  }
</style>