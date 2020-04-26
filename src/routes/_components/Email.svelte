<script>
  import { fly } from 'svelte/transition';
  let visible = false;
  let placeholder;

  export let hint = "email@google";
  export let icon = "at";

  placeholder = hint;

  const focus = () => {
    visible = true;
    placeholder = "";
  }

  const blur = () => {
    visible = false;
    setTimeout( () => placeholder = hint, 480);
  }
</script>

<style>
.trans {
  z-index: 6;
  position: absolute;
  margin-top: -1.5rem;
  padding-left: 4.5rem;
}
.trans::before {
  z-index: 6;
}
.mid {
  text-align: left;
}
</style>

<div class="container-flex mid">
  {#if visible}
  <label in transition:fly="{{ y: 40, duration: 500, opacity: 1 }}"
         for="inputbox" class="text-dark trans">
    {hint}
  </label>
  {/if}
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text bg-info">
        <i class="fas fa-{icon} text-dark"></i>
      </span>
    </div>
    <input id="searchbox" on:focus="{focus}" on:blur="{blur}"
           type="text" class="form-control p-4 m-0"
           placeholder="{placeholder}">
  </div>
</div>
