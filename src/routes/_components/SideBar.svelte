<script>
  import { fly } from 'svelte/transition'
  import SideBarItem from './SideBarItem.svelte';
</script>

<nav class="nav bg-primary py-2 border-right d-flex flex-column align-items-stretch justify-content-start sticky-top"
      in transition:fly="{{x: -150, duration: 500}}">
  <SideBarItem title="Thing" sel_num="9" />
  <SideBarItem title="Thing_2" sel_num="19" />
  <SideBarItem title="Thing_3" sel_num="29" />
</nav>

<style>
  nav {
    border-right-color: rgb(99, 77, 77);
    border-bottom-right-radius: 0.5rem;
    box-shadow: 5px 10px 10px #d7baff;
    width: 285px;
    height: 100%;
    z-index: 0;
  }

  @media screen and (min-width: 1260px) {
    nav {
      height: calc(100vh - 4.5rem);
    }
  }
  @media screen and (max-width: 1260px) {
    nav {
      height: calc(100vh - 4.4rem);
    }
  }
  @media screen and (max-width: 970px) {
    nav {
      height: calc(100vh - 4.2rem);
    }
  }
</style>
