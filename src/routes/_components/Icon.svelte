<script>
  import { fly } from 'svelte/transition';

  export let awesome;
</script>

<div in transition:fly="{{x: 150, duration: 800}}"
   class="btn btn-primary btn-lg">
  <i class={awesome}></i>
</div>

<style>
  @media screen and (min-width: 1200px) {
    i {
      font-size: 24pt;
    }
    .btn {
      font-size: 14pt;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  @media screen and (max-width: 1200px) {
    i {
      font-size: 20pt;
    }
    .btn {
      font-size: 12pt;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
  }
  @media screen and (max-width: 930px) {
    i {
      font-size: 16pt;
    }
    .btn {
      font-size: 10pt;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>
