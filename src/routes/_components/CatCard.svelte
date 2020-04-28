<script>
  import { pageseg } from "../../stores.js";
  export let colour = "primary";
  export let item = {};
  export let handlePopup = undefined;
  export let filterfn = undefined;
</script>

<div class="card bg-{colour}">
  <div class="card-body m-0 p-1" data-toggle="popover" title="{item.alias}"
       href="app/catalog-details" on:click={() => $pageseg = item}
       data-trigger="focus" data-template={
      `<div class="popover dropdown-menu">
          <h3 class="popover-header"></h3>
          <div class="dropdown-item text-dark"> View <span class="popover-body m-0 p-0"></span> Concept </div>
          <div class="dropdown-item text-dark"> View <span class="popover-body m-0 p-0"></span> Detail </div>
          <div class="dropdown-item text-dark"> View Events </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item text-dark"> View <span class="popover-body m-0 p-0"></span> Change Rules </div>
          <div class="dropdown-item text-dark"> View <span class="popover-body m-0 p-0"></span> Validation Rules </div>
          <div class="dropdown-item text-dark"> View <span class="popover-body m-0 p-0"></span> Consume Rules </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item text-dark"> Create Concept </div>
          <div class="dropdown-item text-dark"> Create Detail </div>
          <div class="dropdown-item text-dark"> Create Event </div>
          <div class="dropdown-item text-dark"> Create Rule </div>
        </div>`} data-html={true}
        data-content={item.alias.split(' ')[0]}
        on:click={() => filterfn([item.object, ...item.topics])}
        on:contextmenu|preventDefault={handlePopup}>
    <span class="float-right m-0 p-1">
      <a role="button" class="btn btn-primary btn-sm p-0 m-0 card-icon" href="app/catalog-details" on:click={() => $pageseg = item}>
        <svg class="bi bi-pencil m-0 p-0" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
        </svg>
      </a>
      <button class="btn btn-primary m-0 p-0 btn-sm card-icon" on:click={handlePopup}>
        <svg class="bi bi-three-dots-vertical" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>
        </svg>
      </button>
    </span>
    <h6 class="card-title heading-{colour} flex-wrap">{item.alias}</h6>
    <p class="card-text my-1">
    {#each item.topics as token}
      <span class="border border-ternary bg-light topic rounded px-1 py-0 m-1">
        {token}
      </span>
    {/each}
    </p>
  </div>
</div>

<style>
  .card-icon {
    padding-left: 0.33em;
  }
  .topic {
    line-height: 2em;
  }
  .heading-concept {
    color: var(--light);
  }
  .heading-event {
    color: var(--light);
  }
  h6 {
    font-size: 15pt;
  }
  .card {
    width: 20rem;
    height: 15rem;
    max-width: 200px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>