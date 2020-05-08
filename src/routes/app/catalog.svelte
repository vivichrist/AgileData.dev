<script context="module">
	import TopItem from "./../_components/TopItem.svelte";
	import Category from "./../_components/Category.svelte";
  let categories = new Map();
  let topics = new Map();
  let data = [];

  export async function preload(page, session) {
    await this.fetch(
      'https://agiledata-core-prd.appspot.com/tables/?apikey=977609nhgfty86HJKhjkl78')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response for Catagory views was not ok');
        }
        return res.json()
      })
      .then(jsn => data = jsn.map(obj => {
        for (let key in obj) {
          if (!Array.isArray(obj[key])) {
            obj[key] = obj[key].replace(/[_.]/g, ' '); // remove underscores and dot
          } else {obj[key].sort();}
        }
        return obj;
      }));
    await data.forEach(
      obj => {
      if (categories.has(obj.object)) {
        categories.get(obj.object).push(obj);
      } else {
        categories.set(obj.object, [obj]);
      };
      obj.topics.forEach(element => {
        if (topics.has(element)) {
          topics.get(element).push(obj);
        } else {
          topics.set(element, [obj]);
        };
      });
    });
  };

</script>

<script>
  import { beforeUpdate, onMount, onDestroy } from 'svelte';
  // import { stores } from '@sapper/app';
  import { popup } from "../../stores.js";
  const all_cat = [...categories.keys()];
  const all_top = [...topics.keys()];

  let Category;
  let SubMenu;
  onMount(async () => {
    const module1 = await import('../_components/Category.svelte');
    const module2 = await import( "../_components/SubMenu.svelte");
    Category = module1.default;
    SubMenu = module2.default;

    window.hidePopups = () => {
      let p = $popup;
      window.$(p).popover('hide');
    };

    window.$('[data-toggle="popover"]').popover({ container: 'body' });
  });

  onDestroy(() => {
    categories.clear();
    topics.clear();
    data.length = 0;
  });

  // const { preloading, page, session } = stores();
  // const pagefilter = page.query.filter || "";

  // console.log(data);
  let cat_filter = [...categories.keys()];
  let top_filter = [...topics.keys()];

  const filter_maps = (obj) => {
    if (categories.has(obj.object)) {
      categories.get(obj.object).push(obj);
    } else {
      categories.set(obj.object, [obj]);
    };
    obj.topics.forEach(element => {
      if (topics.has(element)) {
        topics.get(element).push(obj);
      } else {
        topics.set(element, [obj]);
      };
    });
  };

  const reset_maps = () => {
    categories.clear();
    topics.clear();
  }

  const compareKV = (a, b) => {
    if (topics.has(a) && topics.has(b))
      return topics.get(a).length - topics.get(b).length;
    return 0;
  }

  const refilter_maps = (obj) => {
    if (cat_filter.find((e) => e === obj.object)) {
      if (categories.has(obj.object)) {
        categories.get(obj.object).push(obj);
      } else {
        categories.set(obj.object, [obj]);
      };
      obj.topics.forEach(element => {
        if (top_filter.find((e) => e === element)) {
          if (topics.has(element)) {
            topics.get(element).push(obj);
          } else {
            topics.set(element, [obj]);
          };
        };
      });
    };
  };

  $: filter_by = (f) => {

    if (typeof(f) === "string") {
      if (f === "reset") { // Everything
        beforeUpdate(() => {
          reset_maps();
          data.forEach(e => filter_maps(e));
        });
        cat_filter = all_cat;
        top_filter = all_top;
      } else if (f === "topics") { // All topics
        top_filter = all_top;
        cat_filter.length = 0;
        top_filter.sort(compareKV);
      } else {
        if (all_cat.some(e => e === f)) {
          cat_filter.length = 0;
          cat_filter = [f, ...cat_filter];
        } else if (all_top.some(e => e === f)) {
          top_filter.length = 0;
          top_filter = [f, ...top_filter];
        }
        beforeUpdate(() => {
          reset_maps();
          data.forEach(e => refilter_maps(e));
        });
      };
      console.log(`filter by: ${f}`);
    } else if (Array.isArray(f)) { // should be an array of strings
      if (f.length === 0) return;
      cat_filter.length = 0;
      top_filter.length = 0;
      for (const e of f) {
        if (all_cat.find(k => k === e)) cat_filter = [e, ...cat_filter];
        if (all_top.find(k => k === e)) top_filter = [e, ...top_filter];
      }
      beforeUpdate(() => {
        reset_maps();
        data.forEach(e => refilter_maps(e));
      });
      console.log(`filter with: ${f}`);
    };
  };

  // if (pagefilter.length !== 0) {
  //   filter_by(pagefilter);
  // }
</script>

<svelte:component this={SubMenu} filterfn={filter_by} />
{#each cat_filter as cat}
  {#if categories.get(cat).length > 0}
    <svelte:component this={Category}
                      name="{cat[0].toUpperCase() + cat.substr(1)} Area"
                      type={cat} data={categories.get(cat)}
                      filterfn={filter_by} />
  {/if}
{/each}
{#each top_filter as topic}
  {#if topics.get(topic).length > 0}
    <svelte:component this={Category}
                      name="{topic} Topic"
                      type={topic} data={topics.get(topic)}
                      filterfn={filter_by} />
  {/if}
{/each}