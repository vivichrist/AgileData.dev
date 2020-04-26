<script>
  import { fly } from 'svelte/transition';
  let visible = false;
  let placeholder = "Search";

  const focus = () => {
    visible = true;
    placeholder = "";
  }

  const blur = () => {
    visible = false;
    setTimeout( () => placeholder = "Search", 480);
  }
</script>



<div class="d-flex flex-column align-items-end justify-content-center">
  <div id="search">
    {#if visible}
    <label in transition:fly="{{ y: 40, duration: 500, opacity: 1 }}" for="searchbox" class="text-dark">
      Search
    </label>
    {/if}
    <div class="input-group align-self-center">
      <div class="input-group-prepend">
        <span class="input-group-text bg-light">
          <i class="fas fa-search text-dark"></i>
        </span>
      </div>
      <input id="searchbox" on:focus="{focus}" on:blur="{blur}"
            type="text" class="form-control" placeholder="{placeholder}"/>
    </div>
  </div>
</div>

<style>
  .d-flex {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    margin-left: 3rem;
    margin-right: 3rem;
  }
  #search {
    width: 100%;
    text-align: left;
  }
  label {
    z-index: 6;
    position: absolute;
    padding-left: 4rem;
  }
  .input-group {
    padding-top: 2rem;
  }
    @media screen and (min-width: 1260px) {
    .d-flex {
      height: calc(100vh - 4.5rem);
    }
  }
  @media screen and (max-width: 1260px) {
    .d-flex {
      height: calc(100vh - 4.4rem);
    }
  }
  @media screen and (max-width: 970px) {
    .d-flex {
      height: calc(100vh - 4.2rem);
    }
  }
</style>
