<script>
  export let pages = 3;
  export let pos = 1;
  export let limit = undefined;
  export let rng = undefined;

  let arr = [];

  const update = newpos => {
    let np = Math.min(Number(newpos), limit);
    if (np > 0) {
      let s = Math.max(1, Math.min(np - Math.floor(pages / 2),
                       limit - (pages - 1)));
      let e = s + pages;
      arr = []
      for (let i = s; i < e; ++i) {
        arr.push(i);
      }
      pos = np;
    }
  };

  update(pos);
</script>

<style>
  #page-btn {
    width: 2.25rem;
  }
  .nfc {
    border-color: #c2c2c2;
    color: #505050;
  }
  #np-btn.btn-white {
    color: #c2c2c2;
  }
  #np-btn, #page-btn {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
  @media screen and (min-width: 1260px) {
    #page-btn {
      font-size: 10pt;
      margin: 1rem;
    }
    #np-btn, #page-btn {
      margin: 1rem;
    }
  }
  @media screen and (max-width: 1260px) {
    #page-btn {
      font-size: 9pt;
      margin: 0.5rem;
    }
    #np-btn, #page-btn {
      margin: 0.5rem;
    }
  }
  @media screen and (max-width: 970px) {
    #page-btn {
      font-size: 8pt;
      padding-left: 0.125rem;
      padding-right: 0.125rem;
    }
    #np-btn, #page-btn {
      margin: 0.2rem;
    }
  }
</style>

<div class="d-flex flex-row justify-content-between">
  <span class="text-primary">
    <span>Page</span>
    <div class="btn-group dropup">
      <button  type="button" id="dropdownMenuButton" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false"
               class="btn btn-outline-primary btn-xs dropdown-toggle rounded-pill py-0 px-2">
        {pos}
      </button>
      <div class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuButton"
           direction="left" aria-hidden="true">
        {#each [...Array(limit).keys()] as i}
        <button class="dropdown-item py-0" type="button" role="menuitem"
                on:click={update(i + 1)}>
          {Math.max(1, i + 1)}
        </button>
        {/each}
      </div>
    </div>
    <span>of</span>
    {limit}
  </span>
  <nav class="nav justify-content-center" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item">
      {#if pos == 1}
        <button class="btn btn-white btn-outline-light rounded-pill"
                id="np-btn" aria-label="Previous">
          <i aria-hidden="true" class="fas fa-angle-left" />
          <span class="sr-only">Previous</span>
        </button>
      {:else}
        <button class="btn btn-light btn-outline-primary rounded-pill"
                id="np-btn" on:click={update(pos - 1)}
                aria-label="Previous">
          <i aria-hidden="true" class="fas fa-angle-left" />
          <span class="sr-only">Previous</span>
        </button>
      {/if}
      </li>
      {#each arr as n}
        {#if n === pos}
          <li class="page-item active">
            <button class="btn btn-outline-dark font-weight-bold rounded-pill"
                    id="page-btn"
                    on:click={update(n)}>{n}</button>
          </li>
        {:else if n <= limit}
          <li class="page-item">
            <button class="btn btn-outline-success font-weight-light rounded-pill nfc"
                    id="page-btn"
                    on:click={update(n)}>{n}</button>
          </li>
        {/if}
      {/each}
      <li class="page-item">
      {#if pos == limit}
        <button class="btn btn-white btn-outline-light rounded-pill"
                id="np-btn" aria-label="Next">
          <i aria-hidden="true" class="fas fa-angle-right" />
          <span class="sr-only">Next</span>
        </button>
      {:else}
        <button class="btn btn-light btn-outline-primary rounded-pill"
                id="np-btn"
                on:click={update(pos + 1)} aria-label="Next">
          <i aria-hidden="true" class="fas fa-angle-right" />
          <span class="sr-only">Next</span>
        </button>
      {/if}
      </li>
    </ul>
  </nav>
  <span class="text-primary">
    <span>Items:</span>
    <div class="btn-group dropup">
      <button  type="button" id="dropdownMenuButton" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false"
               class="btn btn-outline-primary dropdown-toggle rounded-pill py-0 px-2">
        {rng}
      </button>
      <div class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuButton"
           direction="left" aria-hidden="true">
        {#each [10, 20, 50, 100, 200] as i}
        <button class="dropdown-item py-0" type="button" role="menuitem"
                on:click={() => {rng = i;update(1);}}>
          {i}
        </button>
        {/each}
      </div>
    </div>
  </span>
</div>
