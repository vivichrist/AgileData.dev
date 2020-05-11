<script>
  import { popup } from '../../stores.js'
  import CatCard from './CatCard.svelte';

  export let data = [];
  export let name = "Missing Category";
  export let type = "NoCategory";
  export let filterstr = "";

  let rng = Math.floor(window.innerWidth / 235);

  $: limit = Math.ceil(data.length / rng);

  const handleWidth = ()  => {
    rng = Math.floor(window.innerWidth / 235);
  };

  const handlePopup = (e) => {
    window.$($popup).popover('hide');
    if ($popup !== e.target) {
      window.$(e.target).popover('toggle');
    }
    $popup = e.target;
  };
</script>

<svelte:window on:resize={handleWidth} on:load={handleWidth}/>

<div class="d-inline-flex flex-row flex-fill justify-content-start"
     style="width: calc({Math.min(data.length, rng) * 225}px + 2rem);">
  <div id="{type}Captions" class="carousel slide flex-fill justify-content-start"
       data-interval="false">
    <h5 class="d-block text-left font-weight-bold mb-3 pb-0">
      {name}
    </h5>
    {#if data.length > rng }
    <ol class="carousel-indicators justify-content-end">
    {#each [...Array(limit).keys()] as i}
        <li data-target="#{type}Captions"
            data-slide-to={i == limit ? 0 : i}
            class:active={i === 0}>
        </li>
    {/each}
    </ol>
    {/if}
    <div class="carousel-inner">
      {#each [...Array(limit).keys()] as i}
        <div class="carousel-item" class:active={i == 0}>
        <div class="d-flex bd-highlight justify-content-start">
        {#each data.slice(rng * i, Math.min(rng * (i + 1), data.length)) as item}
          <CatCard colour={item.object} item={item}
                   handlePopup={handlePopup} bind:filterstr={filterstr} />
        {/each}
        </div>
        </div>
      {/each}
    </div>
    {#if data.length > rng }
    <a class="carousel-control-prev" href="#{type}Captions" role="button"
       data-slide="prev" on:click={window.hidePopups}>
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#{type}Captions" role="button"
       data-slide="next" on:click={window.hidePopups}>
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    {/if}
  </div>
</div>

<style>
  .carousel {
    height: 18rem;
    margin-right: 3rem;
    margin-left: 3rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .carousel-inner {
    height: 15rem;
    margin-right: 0;
    margin-left: 0;
  }
  .carousel-indicators {
    bottom: 90%;
    margin-right: 10rem;
    margin-left: 0;
    padding-right: 0;
    margin-bottom: 0;
  }
  .carousel-control-prev {
    width: 3rem;
    left: -3%;
  }
  .carousel-control-next {
    right: -3%;
    width: 3rem;
  }
</style>
