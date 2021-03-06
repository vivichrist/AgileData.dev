<script context="module">
  let data = [];
  const mode = process.env.DEMO;
  const api = process.env.AGILEDATA_API;

  export async function preload() {
    if (process.browser) {
      await this.fetch(
        mode ? "/api/events_catalog" : `${api}/api/events_catalog`,
        { credentials: "include" }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response for Consume table was not ok");
          }
          return res.json();
        })
        .then(
          (jsn) =>
            (data = jsn.map((obj) => {
              for (let key in obj) {
                if (obj[key]) {
                  if (typeof obj[key] === "string") {
                    obj[key] = obj[key].replace(/_/g, " "); // remove underscores
                  } else if (Array.isArray(obj[key])) {
                    obj[key] = obj[key].join(" ");
                  } else {
                    obj[key] = `${obj[key]}`;
                  }
                } else {
                  obj[key] = "";
                }
              }
              return obj;
            }))
        );
    }
    return undefined;
  }
</script>

<script>
  import RuleColumn from "../_components/RuleColumn.svelte";
  import Pagination from "../_components/Pagination.svelte";

  export let rng = 10; // how many items to display per page
  export let pos = 1; // which page to view
  // list of sorting directions
  let sorting = 2;
  let column = "Alias";

  // list of filter strings, empty string means no filter
  let ftype = {
    Alias: "",
    Table_Name: "",
    Object: "",
    Description: "",
    Topics: "",
    Row_Count: "",
    Last_Refreshed: "",
  };

  // filter the data according to the associated input boxes
  $: fdata = data.filter((d) => {
    // data filtered from all the data
    return Object.entries(ftype).every((t) => {
      return d[t[0].toLowerCase()].search(t[1]) >= 0;
    });
  });
  // how many pages of items in total.
  $: limit = Math.ceil(fdata.length / rng);
  // start index of the current page.
  $: startrng = Math.max(0, Math.min(limit, pos) - 1) * rng;
  // end index of the current page.
  $: endrng = Math.min(startrng + Number(rng), fdata.length);
  // page data segment from fdata.
  $: dataseg = fdata.slice(startrng, endrng);

  const sortByColumn = (col) => {
    if (column === col) {
      sorting = sorting ? 0 : 1; // flip sorting order
    } else {
      column = col; // start with ascending sort.
      sorting = 0;
    }
    if (sorting < 2) {
      let c = col.toLowerCase();
      data.sort(function (a, b) {
        if (col === "Row_Count") {
          let x = parseInt(a[c], 10);
          let y = parseInt(b[c], 10);
          if (x < y) {
            return sorting === 0 ? -1 : 1;
          }
          if (x > y) {
            return sorting === 0 ? 1 : -1;
          }
        } else {
          let x = a[c].toLowerCase();
          let y = b[c].toLowerCase();
          if (x < y) {
            return sorting === 0 ? -1 : 1;
          }
          if (x > y) {
            return sorting === 0 ? 1 : -1;
          }
        }
        return 0;
      });
      fdata = data.filter((d) => {
        return Object.entries(ftype).every((t) => {
          return d[t[0].toLowerCase()].search(t[1]) >= 0;
        });
      });
      dataseg = fdata.slice(startrng, endrng);
    }
  };
</script>

<style>
  .nav {
    top: 4.5rem;
  }
  .d-flex {
    display: flex;
    padding: 0.8rem;
  }
  .inner {
    background-color: white;
    box-shadow: 0 0 10px #eee2ff;
    border-radius: 0.5rem 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  /* table {
  } */
  .rows {
    min-width: 3rem;
    overflow: hidden;
    font-weight: 400;
    color: #505050;
    line-height: 2.5rem;
  }
  @media screen and (min-width: 1260px) {
    .rows {
      max-width: 14vw;
      font-size: 12pt;
    }
  }
  @media screen and (max-width: 1260px) {
    .rows {
      max-width: 10vw;
      font-size: 10pt;
    }
  }
  @media screen and (max-width: 970px) {
    .rows {
      max-width: 8vw;
      font-size: 9pt;
    }
  }
  table {
    box-sizing: border-box;
    max-width: 100%;
  }
</style>

<div
  class="nav sticky-top w-100 nav-fill bg-white border-bottom border-ternary">
  <span class="nav-item text-left p-2" role="button">
    <i class="fa fa-plus" />
    Add a Rule
  </span>
</div>
<div class="d-flex flex-column">
  <div class="inner table-responsive">
    <table class="table bg-white">
      <thead class="thead-black">
        <tr>
          {#each [...Object.keys(ftype)] as name}
            <RuleColumn
              {name}
              bind:filter={ftype[name]}
              bind:column
              callback={() => sortByColumn(name)}
              bind:sort={sorting} />
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each dataseg as seg}
          <tr>
            {#each [...Object.keys(ftype)] as name}
              <th class="text-truncate rows">{seg[name.toLowerCase()]}</th>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    <Pagination
      pages={Math.min(5, fdata.length)}
      bind:pos
      bind:limit
      bind:rng />
  </div>
</div>
