<script>
  import { pageseg } from '../../stores.js';

  export let data = $pageseg;
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-6 columns">
      <span class="float-right mt-4">
      {#each data.topics as topic}
        <span class="btn btn-outline-ternary rounded-pill">{topic}</span>
      {/each}
      </span>
      <h5 class="my-4 text-{data.object}">{data.alias}</h5>
      <div class="row left-side">
        <div class="col-10 maincontext border-primary rounded bg-white pr-0">
          <div class="tab-content p-2" id="v-tabs-tabContent">
            <div class="tab-pane fade show active" id="v-tabs-1" role="tabpanel" aria-labelledby="v-tabs-1-tab">{data.id} </div>
            <div class="tab-pane fade" id="v-tabs-2" role="tabpanel" aria-labelledby="v-tabs-2-tab">{data.name}</div>
            <div class="tab-pane fade" id="v-tabs-3" role="tabpanel" aria-labelledby="v-tabs-3-tab">blah</div>
            <div class="tab-pane fade" id="v-tabs-4" role="tabpanel" aria-labelledby="v-tabs-4-tab">blah blah</div>
          </div>
        </div>
        <div class="col-2 pl-0">
          <div class="nav nav-tabs tabs-right flex-column h-100" id="v-tabs-tab" role="tablist" aria-orientation="vertical">
            <a class="nav-link active" id="v-tabs-1-tab" data-toggle="tab" href="#v-tabs-1" role="tab" aria-controls="v-tabs-1" aria-selected="true">Context</a>
            <a class="nav-link" id="v-tabs-2-tab" data-toggle="tab" href="#v-tabs-2" role="tab" aria-controls="v-tabs-2" aria-selected="false">Field</a>
            <a class="nav-link" id="v-tabs-3-tab" data-toggle="tab" href="#v-tabs-3" role="tab" aria-controls="v-tabs-3" aria-selected="false">Date</a>
            <a class="nav-link" id="v-tabs-4-tab" data-toggle="tab" href="#v-tabs-4" role="tab" aria-controls="v-tabs-4" aria-selected="false">Stamp</a>
          </div>
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
        <button class="btn btn-outline-light border-0" type="button"
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
  .nav-link {
    border-width: 0 0 0 1px;
  }
  .nav-link.active {
    background-color: azure;
    border-left-width: 0;
    border-radius: 0 0.25rem 0.25rem 0;
  }

  .nav-link:hover {
    border-left-width: 0;
    border-radius: 0 0.25rem 0.25rem 0;
  }
  .right-side {
    height: 20%;
  }
  .maincontext {
    border: 1px solid var(--primary);
  }
  .left-side {
    margin-left: 2rem;
    box-sizing: border-box;
    height: 70%;
    flex: 1 1 70%;
  }
  .columns {
    height: 75vh;
  }
</style>