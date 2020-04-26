<script>
  let sorts = [
    "/agiledata-logo-icon-purple-dropdown.svg",
    "/agiledata-logo-icon-purple-dropdown.svg",
    "/agiledata-logo-icon-grey-dropdown.svg"
  ];
  export let name = "";
  export let filter = "";
  export let column = "";
  export let callback = () => {};
  export let sort = 2;
</script>

<style>
  input::placeholder {
    color: #bd8eff;
  }
  input {
    border-color: #d7d7d7;
    color: black;
    padding: 0.125rem;
    margin: 0.0126rem;
  }
  @media screen and (min-width: 1260px) {
    input {
      max-width: 14vw;
      font-size: 12pt;
    }
  }
  @media screen and (max-width: 1260px) {
    input {
      max-width: 12vw;
      font-size: 10pt;
    }
  }
  @media screen and (max-width: 970px) {
    input {
      max-width: 10vw;
      font-size: 9pt;
    }
  }
</style>

<th scope="col">
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder={name}
      bind:value={filter} />
    <div class="input-group-append" on:click={callback}>
      <span class="input-group-text bg-white border-0 m-0 p-0">
        {#if column == name}
          {#if sort == 1}
            <img
              width="15"
              height="15"
              src={sorts[sort]}
              style="transform: rotate(180deg);"
              alt="sorting" />
          {:else}
            <img width="15" height="15" src={sorts[sort]} alt="sorting" />
          {/if}
        {:else}
          <img width="15" height="15" src={sorts[2]} alt="sorting" />
        {/if}
      </span>
    </div>
  </div>
</th>
