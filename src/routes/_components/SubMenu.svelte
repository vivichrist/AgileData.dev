<script>
  export let filterfn = undefined;
</script>

<ul class="nav sticky-top vw-100 nav-fill bg-white border-bottom border-ternary">
    <li class="nav-item" on:click={() => filterfn("topics")}>
      <span role="button" class="nav-link under-dark">Topics</span>
    </li>
    <li class="nav-item" on:click={() => filterfn("event")}>
      <span role="button" class="nav-link under-dark">Events</span>
    </li>
    <li class="nav-item" on:click={() => filterfn("concept")}>
      <span role="button" class="nav-link under-dark">Concepts</span>
    </li>
    <li class="nav-item" on:click={() => filterfn("detail")}>
      <span role="button" class="nav-link under-dark">Details</span>
    </li>
    <li class="nav-item" on:click={() => filterfn("history")}>
      <span role="button" class="nav-link under-dark">History</span>
    </li>
    <li class="nav-item" on:click={() => filterfn("consume")}>
      <span role="button" class="nav-link under-dark">Consume</span>
    </li>
    <li class="nav-item">
      <span role="button" class="nav-link under-dark">Recently Added</span>
    </li>
    <li class="nav-item">
      <span role="button" class="nav-link under-dark">Most Viewed</span>
    </li>
    <li class="nav-item" on:click={() => filterfn("reset")}>
      <span role="button" class="nav-link under-dark">My Lists</span>
    </li>
</ul>

<style>
  ul {
    top: 4.5rem;
  }
</style>