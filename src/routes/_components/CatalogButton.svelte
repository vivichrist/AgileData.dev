<script>
  import { fly } from 'svelte/transition';
  import { filterstr } from "../../stores.js";
</script>

<button type="button" class="nav-link btn btn-primary py-3 m-0"
   href="app/catalog?filter=reset" in transition:fly="{{y: -100, duration: 500}}">
  Catalog
</button>


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
    .btn {
      font-size: 14pt;
    }
  }
  @media screen and (max-width: 1260px) {
    .btn {
      font-size: 12pt;
    }
  }
  @media screen and (max-width: 970px) {
    .btn {
      font-size: 11pt;
    }
  }
</style>
