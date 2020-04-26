<script>
  export let data = {
    id: "Test ID",
    name: "Test Name",
    alias: "Testing App Title (alias)",
    topics: [
      "some topic",
      "some other topic",
    ]
  };
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-6 columns">
      <span class="float-right mt-4">
      {#each data.topics as topic}
        <span class="btn btn-outline-ternary rounded-pill">{topic}</span>
      {/each}
      </span>
      <h5 class="mt-5">{data.alias}</h5>
      <div class="input-group left-side">
        <textarea class="form-control ml-3" aria-label="With textarea">
          {data.id} {data.name}
        </textarea>
        <div class="input-group-prepend">
          <span class="input-group-text border-0">With textarea</span>
        </div>
      </div>
    </div>
    <div class="col-md-6 columns">
      <textarea class="form-control my-5 right-side"
                aria-label="Data Quality"
                placeholder="Data Quality"></textarea>
      <textarea class="form-control my-5 right-side"
                aria-label="Data Owners"
                placeholder="Data Owners"></textarea>
      <textarea class="form-control my-5 right-side"
                aria-label="Threaded Chat"
                placeholder="Threaded Chat"></textarea>
    </div>
  </div>
  <div class="row mx-3 my-1">
    <div class="input-group">
      <input type="text" class="form-control"
             placeholder="Data Preview"
             aria-label="Data Preview">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary border-0" type="button"
                data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
          <img width="15" height="15" src="/agiledata-logo-icon-purple-dropdown.svg"
               alt="dropdown" />
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div role="separator" class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .right-side {
    height: 20%;
  }
  .left-side {
    height: 70%;
  }
  .columns {
    height: 75vh;
  }
</style>