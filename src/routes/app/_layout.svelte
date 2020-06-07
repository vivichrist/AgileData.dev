<script>
  // import Menu from '../components/Menu.svelte';
  import Nav from "../_components/Nav.svelte";

  export let segment;
</script>

<style>
  .align-items-center {
    position: absolute;
    top: 4.5rem;
    padding: 0;
    margin: 0;
    width: 100%;
  }
</style>

<svelte:head>
  <title>AgileData.io</title>
</svelte:head>

<Nav {segment} />

<div
  class="d-flex flex-row align-items-center justify-content-center flex-wrap">
  <slot />
</div>
