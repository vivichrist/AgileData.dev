<script>
  export let filterfn = undefined;
</script>

<ul class="nav sticky-top vw-100 nav-fill bg-white border-bottom border-ternary">
    <li class="nav-item">
      <a role="button" class="nav-link under-dark"
         on:click={() => filterfn("topics")}
         href="app/catalog">Topics</a>
    </li>
    <li class="nav-item">
      <a role="button" class="nav-link under-dark"
         on:click={() => filterfn("event")}
         href="app/catalog">Events</a>
    </li>
    <li class="nav-item">
      <a role="button" class="nav-link under-dark"
         on:click={() => filterfn("concept")}
         href="app/catalog">Concepts</a>
    </li>
    <li class="nav-item">
      <a role="button" class="nav-link under-dark"
         on:click={() => filterfn("detail")}
         href="app/catalog">Details</a>
    </li>
    <li class="nav-item">
      <a role="button" class="nav-link under-dark"
         on:click={() => filterfn("history")}
         href="app/catalog">History</a>
    </li>
    <li class="nav-item">
      <a role="button" class="nav-link under-dark"
         on:click={() => filterfn("consume")}
         href="app/catalog">Consume</a>
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
         on:click={() => filterfn("reset")}
         href="app/catalog">My Lists</a>
    </li>
</ul>

<style>
  ul {
    top: 4.5rem;
  }
</style>