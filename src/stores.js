import { writable } from "svelte/store";

export const content = writable(0);
export const manage = writable(false);
export const popup = writable(undefined);
export const filterstr = writable("reset");
export const pageseg = writable({
  alias: "Customer Orders Part",
  id: "consume.customer_orders_part",
  name: "customer_orders_part",
  object: "consume",
  topics: ["Customer", "Orders", "Part"],
});
export const id = writable("");
export const name = writable("");
export const given_name = writable("");
export const family_name = writable("");
export const img_url = writable("");
export const email = writable("");
export const token = writable("");

