<script context="module">
  let menus = {
    Icealicous: "Link_1 13 Link_2 13 Link_3 13",
    Events: "Link_1 13 divider 0 Link_2 13 Link_3 13 divider 0 Link_4 13",
    Rules: "Add_Rules 13 divider 0 All_Rules 1 Change_Rules 1 Validation_Rules 13 Consume_Rules 13 divider 0 Lineage 13",
    Consume: "Link_1 13 divider 0 Link_2 13 Link_3 13 divider 0 Link_4 13",
    Plus: "CatalogDetails 3 divider 0 Blah_Blah 13"
  };
</script>

<script>
  import MenuItem from "./MenuItem.svelte";
  import TopItem from "./TopItem.svelte";
  import MenuDrop from "./MenuDrop.svelte";
  import MenuPopup from "./MenuPopup.svelte";
  import Icon from "./Icon.svelte";

  export let user = "No User";
  export let pic = "img/user.png";

</script>

<nav class="navbar navbar-expand-md bg-primary d-flex flex-row fixed-top">
  <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <!-- nav menu -->
  <div class="collapse navbar-collapse align-items-stretch" id="collapsibleNavbar">
    <MenuDrop title="Icealicous" items="{menus.Icealicous}" />
    <nav class="navbar-nav align-items-stretch justify-content-around left">
      <div class="nav-item d-flex flex-fill btn-group align-self-center under">
        <TopItem item={2}>Catalog</TopItem>
      </div>
      <div class="nav-item d-flex flex-fill btn-group align-self-center under">
        <MenuItem title="Events" items="{menus.Events}" />
      </div>
      <div class="nav-item d-flex flex-fill btn-group align-self-center under">
        <MenuItem title="Rules" items="{menus.Rules}" />
      </div>
      <div class="nav-item d-flex flex-fill btn-group align-self-center under">
        <MenuItem title="Consume" items="{menus.Consume}" />
      </div>
      <div class="nav-item d-flex flex-fill btn-group align-self-center under">
        <TopItem item={0}>Manage</TopItem>
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
