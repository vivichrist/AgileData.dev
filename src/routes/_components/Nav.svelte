<script context="module">
  let menus = {
    Icealicous:
      "Link_1 app/coming-soon Link_2 app/coming-soon Link_3 app/coming-soon",
    Events: "Add_Event_Views app/coming-soon All_Event_Views app/events",
    Rules:
      "Add_Rules app/coming-soon divider 0 All_Rules app/rules Change_Rules app/rules Validation_Rules app/coming-soon Consume_Rules app/coming-soon divider 0 Lineage app/coming-soon",
    Consume: "Add_Consume_Views app/coming-soon All_Consume_Views app/consume",
    Plus:
      "Catalog_Details_Mockup app/catalog-details divider 0 Blah_Blah app/coming-soon",
  };
</script>

<script>
  import MenuItem from "../_components/MenuItem.svelte";
  import TopItem from "../_components/TopItem.svelte";
  import MenuDrop from "../_components/MenuDrop.svelte";
  import MenuPopup from "../_components/MenuPopup.svelte";
  import Icon from "../_components/Icon.svelte";
  import { onMount } from "svelte";
  import { name, img_url } from "../../stores.js";

  let user;
  let pic;
  onMount(() => {
    user = $name ? $name : "No User";
    pic = $img_url ? $img_url : "img/user.png";
  });
  console.log(`User: ${$name}`);
  console.log(`Picture Location: ${$img_url}`);

  export let segment;
</script>

<style>
  .user {
    display: inline-flex;
  }
  div.nav-item {
    padding: 0;
    margin: 0;
  }
  nav.navbar {
    padding: 0;
    margin: 0;
    box-shadow: 0 5px 10px #d7baff;
  }
  .navbar-nav.left {
    display: inline-flex;
    margin: 0;
    padding: 0;
    width: 65%;
  }

  .navbar-nav.right {
    margin: 0;
    padding: 0;
    width: 35%;
  }

  div.navbar-collapse {
    height: 4.5rem;
  }

  @media screen and (min-width: 1260px) {
    div.navbar-collapse {
      height: 4.4rem;
    }
    nav.navbar {
      height: 4.5rem;
    }
    .btn {
      font-size: 18pt;
      padding-left: auto;
      padding-right: auto;
    }
    .user {
      width: 2rem;
      height: 2rem;
    }
  }
  @media screen and (max-width: 1260px) {
    nav.navbar {
      height: 4.4rem;
    }
    div.navbar-collapse {
      height: 4.3rem;
    }
    .btn {
      font-size: 16pt;
      padding-left: auto;
      padding-right: auto;
    }
    .user {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
  @media screen and (max-width: 970px) {
    nav.navbar {
      height: 4.2rem;
    }
    div.navbar-collapse {
      height: 4.1rem;
    }
    .btn {
      font-size: 12pt;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .user {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
</style>

<nav class="navbar navbar-expand-md bg-primary d-flex flex-row fixed-top">
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon" />
  </button>
  <!-- nav menu -->
  <div
    class="collapse navbar-collapse align-items-stretch"
    id="collapsibleNavbar">
    <MenuDrop title="Icealicous" items={menus.Icealicous} />
    <nav class="navbar-nav align-items-stretch justify-content-around left">
      <div
        class="nav-item d-flex flex-fill btn-group align-self-center under"
        class:current={segment === 'catalog'}>
        <TopItem item="app/catalog">Catalog</TopItem>
      </div>
      <div
        class="nav-item d-flex flex-fill btn-group align-self-center under"
        class:current={segment === 'events'}>
        <MenuItem title="Events" items={menus.Events} />
      </div>
      <div
        class="nav-item d-flex flex-fill btn-group align-self-center under"
        class:current={segment === 'rules'}>
        <MenuItem title="Rules" items={menus.Rules} />
      </div>
      <div
        class="nav-item d-flex flex-fill btn-group align-self-center under"
        class:current={segment === 'consume'}>
        <MenuItem title="Consume" items={menus.Consume} />
      </div>
      <div
        class="nav-item d-flex flex-fill btn-group align-self-center under"
        class:current={segment === 'search'}>
        <TopItem item="app/search">Manage</TopItem>
      </div>
    </nav>
    <!-- icon buttons and user button -->
    <nav class="navbar-nav align-items-center justify-content-end right">
      <div class="nav-item d-flex btn-group">
        <MenuPopup items={menus.Plus}>
          <Icon awesome="fas fa-plus" />
        </MenuPopup>
      </div>
      <div class="nav-item">
        <div role="button" class="btn">
          <Icon awesome="fas fa-cog" />
        </div>
      </div>
      <div class="nav-item">
        <div type="button" class="align-self-center btn">
          <img src={pic} class="user img-fluid rounded-circle" alt={user} />
        </div>
      </div>
    </nav>
  </div>
</nav>
