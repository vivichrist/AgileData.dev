<script context="module">
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
  import { beforeUpdate } from 'svelte';
  import { stores } from '@sapper/app';
  import { popup } from "../../stores.js";
  import Category from '../_components/Category.svelte';
  import SubMenu from "../_components/SubMenu.svelte";

  const { preloading, page, session } = stores();
  const pagefilter = page.query.filter || "";

  // console.log(data);
  let cat_filter = new Map([...categories.keys()].map(k => [k, true]));
  let top_filter = new Map(    [...topics.keys()].map(k => [k, true]));

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
    return a[1].length - b[1].length;
  }

  const refilter_maps = (obj) => {
    if (cat_filter.get(obj.object)) {
      if (categories.has(obj.object)) {
        categories.get(obj.object).push(obj);
      } else {
        categories.set(obj.object, [obj]);
      };
      obj.topics.forEach(element => {
        if (top_filter.get(element)) {
          if (topics.has(element)) {
            topics.get(element).push(obj);
          } else {
            topics.set(element, [obj]);
          };
        };
      });
    };
  };

  const filter_by = (f) => {
    if (typeof f === "string") {
      if (f === "reset") { // Everything
        beforeUpdate(() => {
          reset_maps();
          data.forEach(e => filter_maps(e));
        });
        for (const k of cat_filter.keys()) {cat_filter.set(k, true);}
        for (const k of top_filter.keys()) {top_filter.set(k, true);}
      } else if (f === "topics") { // All topics
        for (const k of top_filter.keys()) {top_filter.set(k, true);}
        for (const k of cat_filter.keys()) {cat_filter.set(k, false);}
      } else {
        if (cat_filter.keys().some(e => e === f)) {
          for (const k of cat_filter.keys()) {cat_filter.set(k, k === f);}
          beforeUpdate(() => {
            reset_maps();
            data.forEach(e => refilter_maps(e));
          });
        }
      };
    } else if (Array.isArray(f)) { // should be an array of strings
      if (Object.keys(cat_filter).some(e => f.some(k => k === e))) {
        for (const k of categories.keys()) {
          cat_filter[k] = f.some(d => d === k);
        }};
      if (Object.keys(top_filter).some(e => f.some(k => k === e))) {
        for (const k of topics.keys()) {
          top_filter[k] = f.some(d => d === k);
        }};
      beforeUpdate(() => {
        reset_maps();
        data.forEach(e => refilter_maps(e));
      });
    };
  };

  if (pagefilter.length !== 0) {
    filter_by(pagefilter);
  }

  window.hidePopups = () => window.$($popup).popover('hide');
  window.$('[data-toggle="popover"]').popover({ container: 'body' });
</script>

<SubMenu />
{#each Array.from(categories) as [cat, thedata]}
  {#if cat_filter.get(cat)}
    <Category name="{cat[0].toUpperCase() + cat.substr(1)} Area"
              type={cat} data={thedata} />
  {/if}
{/each}
{#each Array.from(topics) as [topic, thedata]}
  {#if (top_filter.get(topic) && thedata.length > 0)}
    <Category name="{topic} Topic" type={topic} data={thedata} />
  {/if}
{/each}