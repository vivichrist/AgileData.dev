<script context="module">

  let data = [];
  export async function preload(page) {
    if (process.browser) {
      await this.fetch('https://demo.agiledata.io/rules?apikey=977609nhgfty86HJKhjkl78', {
          credentials: "include"
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response for rules table was not ok');
          }
          return res.json()
        })
        .then(jsn => data = jsn.map(obj => {
          for (let key in obj) {
            if (obj[key]) {
              obj[key] = obj[key].replace(/_/g, ' '); // remove underscores
            } else {obj[key] = ""};
          }
          return obj;
        }));
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
  let column = "Rule_Name";

  // list of filter strings, empty string means no filter
  let ftype = {
    Rule_Name: "",
    Source_Object: "",
    Source_Type: "",
    Target_Object: "",
    Target_Type: "",
    Primary_Key_Alias: "",
  };

  // filter the data according to the associated input boxes
  $: fdata = data.filter(d => { // data filtered from all the data
      return Object.entries(ftype).every( t => {
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
      data.sort( function(a, b) {
        let x = a[col].toLowerCase();
        let y = b[col].toLowerCase();
        if (x < y) {return sorting === 0 ? -1 : 1;}
        if (x > y) {return sorting === 0  ? 1 : -1;}
        return 0;
      });
      fdata = data.filter( d => {
        return Object.entries(ftype).every( t => {
          return d[t[0].toLowerCase()].search(t[1]) >= 0;
        });
      });
      dataseg = fdata.slice(startrng, endrng);
    }
  };
</script>

<div class="nav sticky-top w-100 nav-fill bg-white border-bottom border-ternary">
  <span class="nav-item text-left p-2" role="button">
    <i class="fa fa-plus"></i> Add a Rule
  </span>
</div>
<div class="d-flex flex-column">
  <div class="inner table-responsive">
  <table class="table bg-white">
    <thead class="thead-black">
      <tr>
        {#each [...Object.keys(ftype)] as name}
        <RuleColumn name={name} bind:filter={ftype[name]} bind:column={column}
                    callback={() => sortByColumn(name)} bind:sort={sorting} />
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
    <Pagination pages={Math.min(5, fdata.length)} bind:pos={pos}
                bind:limit={limit} bind:rng={rng}/>
  </div>
</div>

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
