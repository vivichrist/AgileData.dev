<script context="module">
  let categories = new Map();
  let topics = new Map();
  let data = [];
  let cat_filter = new Set();
  let top_filter = new Set();
  let all_cat = new Set();
  let all_top = new Set();

  // const compareKV = (a, b) => {
  //   return topics.get(a).length - topics.get(b).length;
  // }

  const filter_not = (obj) => {
    all_cat.add(obj.object)
    if (categories.has(obj.object)) {
      categories.get(obj.object).push(obj);
    } else {
      categories.set(obj.object, [obj]);
    };
    obj.topics.forEach(element => {
      all_top.add(element);
      if (topics.has(element)) {
        topics.get(element).push(obj);
      } else {
        topics.set(element, [obj]);
      };
    });
  };

  const filter_exclude = (filt, obj) => {
    all_cat.add(obj.object)
    if (filt.includes(obj.object)) {
      if (categories.has(obj.object)) {
        categories.get(obj.object).push(obj);
      } else {
        categories.set(obj.object, [obj]);
      };
    };
    obj.topics.forEach(element => {
      all_top.add(element);
      if (filt.includes(element)) {
        if (topics.has(element)) {
          topics.get(element).push(obj);
        } else {
          topics.set(element, [obj]);
        };
      };
    });
  };

  const filter_cat = (filt, obj, inc) => {

    all_cat.add(obj.object)
    if (filt.includes(obj.object)) {
      cat_filter.add(obj.object)
      if (categories.has(obj.object)) {
        categories.get(obj.object).push(obj);
      } else {
        categories.set(obj.object, [obj]);
      };
      // include all related topics
      if (inc) obj.topics.forEach(element => {
        all_top.add(element);
        top_filter.add(element);
      });
    };
  }

  const filter_top = (filt, obj, inc) => {

    obj.topics.forEach(element => {
      all_top.add(element);
      if (filt.includes(element)) {
        // top_filter.add(element);
        if (topics.has(element)) {
          topics.get(element).push(obj);
        } else {
          topics.set(element, [obj]);
        }
        // include all related categories
        if (inc) {
          cat_filter.add(obj.object);
        }
      }
    });
    all_cat.add(obj.object);
  }

  const filter_by = (fstr) => {

    if (typeof(fstr) === "string") {
      if (fstr === "0") {
        data.forEach(e => filter_not(e)); 
        top_filter = all_top;
        cat_filter = all_cat;
      } else if (fstr === "topics") { // All topics
        data.forEach(e => filter_not(e));
        top_filter = all_top;
        cat_filter = new Set();
      } else { // One Area or One Topic
        let regex = /history|event|concept|consume|detail/g;
        if (regex.test(fstr)) {
          data.forEach(e => filter_cat([fstr], e, true));
          [...categories.values()].flat(2)
                                  .forEach(e =>
                                    filter_top([fstr, ...top_filter], e, false)
                                  ); 
        } else {
          data.forEach(e => filter_top([fstr], e, true));
          [...topics.values()].flat(2)
                              .forEach(e =>
                                filter_cat([fstr, ...cat_filter], e, false)
                              );
          top_filter = new Set();
        }
      };

    } else if (Array.isArray(f)) { // should be an array of strings
      data.forEach(e => filter_exclude(fstr, e));
      // cat_filter = new Set(categories.keys());
      // top_filter = new Set(topics.keys());
      console.log(`filter with: ${fstr}`);
    };
  };

  export async function preload(page) {

    let filterstr = page.query.filter || "0";
    // let incl = page.query.inc || false;
    if (process.browser) {
      await this.fetch(
        'https://demo.agiledata.io/combined_catalog/?apikey=977609nhgfty86HJKhjkl78', {
          credentials: "include"
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response for Catagory views has failed');
          }
          return res.json()
        })
        .then(jsn => data = jsn.map(obj => {
          obj.topics.sort();
          return obj;
        })
      );
    };
    cat_filter.clear();
    top_filter.clear();
    categories.clear();
    topics.clear();

    filter_by(filterstr);
    return { filterstr, cat_filter ,top_filter, all_top, categories, topics };
  };

</script>

<script>
  import { beforeUpdate, onMount, onDestroy } from 'svelte';
  import { popup } from "../../stores.js";
  export let filterstr;
  export let cat_filter;
  export let top_filter;
  export let all_top;
  export let categories;
  export let topics;

  console.log(`filter by: ${filterstr}`);

  let Category;
  let SubMenu;
  onMount(async () => {
    const module = await import( "../_components/SubMenu.svelte");
    SubMenu = module.default;
    const module1 = await import('../_components/Category.svelte');
    Category = module1.default;

    window.hidePopups = () => {
      let p = $popup;
      window.$(p).popover('hide');
    };

    window.$('[data-toggle="popover"]').popover({ container: 'body' });
  });

</script>

<svelte:component this={SubMenu} topics={[...all_top].sort()}/>
{#each ["consume", "event", "concept", "detail", "history"] as cat}
  {#if cat_filter.has(cat) && categories.has(cat)}
    <svelte:component this={Category}
                      name="{cat[0].toUpperCase() + cat.substr(1)} Area"
                      type={cat} data={categories.get(cat)} />
  {/if}
{/each}
{#each [...top_filter].sort() as topic}
  {#if topics.has(topic)}
    <svelte:component this={Category}
                      name="{topic} Topic"
                      type={topic} data={topics.get(topic)} />
  {/if}
{/each}
