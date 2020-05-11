<script context="module">
  let categories = new Map();
  let topics = new Map();
  let data = [];

  export async function preload(page, session) {
    await this.fetch(
      'https://agiledata-core-prd.appspot.com/tables/?apikey=977609nhgfty86HJKhjkl78')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response for Catagory views has failed');
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
    await data.forEach(obj => {
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

  let filter_str = "";
  let cat_filter = [...categories.keys()];
  let top_filter = [...topics.keys()].sort();

  const init_maps = (obj) => {
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
    return topics.get(a).length - topics.get(b).length;
  }

  const refilter_exclusive = (obj) => {
    if (cat_filter.find(e => e === obj.object)) {
      if (categories.has(obj.object)) {
        categories.get(obj.object).push(obj);
      } else {
        categories.set(obj.object, [obj]);
      };
    };
    obj.topics.forEach(element => {
      if (top_filter.find(e => e === element)) {
        if (topics.has(element)) {
          topics.get(element).push(obj);
        } else {
          topics.set(element, [obj]);
        };
      };
    });
  };

  const refilter_cat = (obj, inc) => {
    if (cat_filter.find(e => e === obj.object)) {
      if (categories.has(obj.object)) {
        categories.get(obj.object).push(obj);
      } else {
        categories.set(obj.object, [obj]);
      };
      if (inc) obj.topics.forEach(element => {
        if (!top_filter.includes(element)) {
          top_filter = [element, ...top_filter];
        }
      });
    };
  }

  const refilter_top = (obj,inc) => {
    obj.topics.forEach(element => {
      if (top_filter.find(e => e === element)) {
        if (topics.has(element)) {
          topics.get(element).push(obj);
        } else {
          topics.set(element, [obj]);
        }
        if (inc && !cat_filter.includes(obj.object)) {
          cat_filter = [obj.object, ...cat_filter];
        }
      }
    });
  }

  const filter_by = (fstr) => {

    if (fstr.length === 0) fstr = "reset";

    if (typeof(fstr) === "string") {
      if (fstr === "reset") { // Everything
        reset_maps();
        data.forEach(e => init_maps(e));
        beforeUpdate(() => {
          cat_filter = all_cat;
          top_filter = all_top;
          top_filter.sort();
        });
      } else if (fstr === "topics") { // All topics
        reset_maps();
        data.forEach(e => init_maps(e));
        beforeUpdate(() => {
          cat_filter = [];
          top_filter = all_top;
          top_filter.sort();
        });
      } else { // One Area or One Topic
        if (all_cat.some(e => e === fstr)) {
          top_filter = [];
          cat_filter = [fstr];
          reset_maps();
          data.forEach(e => refilter_cat(e, true));
          [...categories.values()].forEach(arr =>
            arr.forEach(e => refilter_top(e, false))
          );
          // beforeUpdate(() => {
          // });
        } else {
          cat_filter = [];
          top_filter = [fstr];
          reset_maps();
          data.forEach(e => refilter_top(e, true));
          [...topics.values()].forEach(arr =>
            arr.forEach(e => refilter_cat(e, false))
          );
          // beforeUpdate(() => {
          // });
        }
      };
      console.log(`filter by: ${fstr}`);
      console.log(cat_filter);
      console.log([...categories.keys()]);
      console.log(top_filter);
      console.log([...topics.keys()]);
    } else if (Array.isArray(f)) { // should be an array of strings
      cat_filter.length = 0;
      top_filter.length = 0;
      for (const e of fstr) {
        if (all_cat.includes(e)) cat_filter = [e, ...cat_filter];
        if (all_top.includes(e)) top_filter = [e, ...top_filter];
      }
      beforeUpdate(() => {
        reset_maps();
        data.forEach(e => refilter_exclusive(e));
      });
      console.log(`filter with: ${filter_str}`);
    };
  };

  $: filter_by(filter_str);
</script>

<svelte:component this={SubMenu} bind:filterstr={filter_str}
                  topics={all_top}/>
{#each cat_filter as cat}
  {#if categories.has(cat) && categories.get(cat).length > 0}
    <svelte:component this={Category}
                      name="{cat[0].toUpperCase() + cat.substr(1)} Area"
                      type={cat} data={categories.get(cat)}
                      bind:filterstr={filter_str} />
  {/if}
{/each}
{#each top_filter as topic}
  {#if topics.has(topic) && topics.get(topic).length > 0}
    <svelte:component this={Category}
                      name="{topic} Topic"
                      type={topic} data={topics.get(topic)}
                      bind:filterstr={filter_str} />
  {/if}
{/each}