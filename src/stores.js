import { writable } from 'svelte/store';

export const content = writable(0);
export const manage = writable(false);
export const popup = writable(undefined);
export const pageseg = writable({
  "alias": "Customer Orders Part",
  "id": "consume.customer_orders_part",
  "name": "customer_orders_part",
  "object": "consume",
  "topics": [
    "Customer",
    "Orders",
    "Part"
  ]
});