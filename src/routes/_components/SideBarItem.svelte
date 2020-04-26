
<script>
  import { fly } from 'svelte/transition';

  export let title = "";
  export let link = "#";
</script>

<a role="button" class="bg-light btn btn-block btn-lg text-dark btn-outline-primary py-0 my-2"
                   href={link}
                   in transition:fly="{{x: -100, duration: 500}}">
  {title}
</a>


<style>
  a {
    box-sizing: border-box;
    width: 250px;
    padding-left: 0;
    padding-right: 0;
    margin-left: 1rem;
    margin-right: 1rem;
    border-radius: 1rem;
    border-color: rgb(99, 77, 77);
    box-shadow: 0 0 10px lightsteelblue inset;
  }
</style>
