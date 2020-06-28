<script>
  const mode = process.env.DEMO || false;

  const isAdvancedUpload = () => {
    let div = document.createElement("div");

    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  };

  let form = document.getElementById("box");
  let droppedFiles = false;
  let entered = false;
  let submitted = false;
  let err = false;

  const enter = () => {
    entered = true;
  };

  const end = () => {
    entered = false;
  };

  const submitting = (e) => {
    if (submitted) return false;

    err = false;

    if (isAdvancedUpload) {
      e.preventDefault();

      let theData = new FormData(form.get(0));

      if (droppedFiles) {
        droppedFiles.forEach((file) => {
          theData.append(file.name, file);
        });
      }

      window
        .fetch(
          `${
            mode
              ? "/api/upload_file"
              : "https://demo.agiledata.io/api/upload_file"
          }`,
          {
            method: form.attr("method"),
            credentials: "include",
            mode: "cors",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(theData),
          }
        )
        .then((response) => response.json())
        .then((res) => {
          if (res.ok) {
            console.log(`Upload Successful: ${res.statusText}`);
          } else {
            console.log(
              `Upload Request failed.  Returned status of ${res.status}`
            );
          }
        })
        .catch((error) => {
          console.error("Fetch Error: ", error);
        });

      return true;
    }
  };
</script>

<style type="text/css" media="screen">
  .area {
    min-width: 250px;
    min-height: 180px;
    background-color: var(--gray-200);
  }
  .dragndrop,
  .uploading,
  .success,
  .error {
    display: none;
  }
  #box {
    padding: 2em;
    min-width: 300px;
    min-height: 200px;
  }
  #box.has-advanced-upload {
    background-color: var(--light);
    outline: 2px dashed black;
    outline-offset: -10px;
  }
  #box.has-advanced-upload .dragndrop {
    display: inline;
  }
  #box.is-dragover {
    background-color: var(--gray-400);
  }
  #box.is-uploading .boxinput {
    visibility: none;
  }
  #box.is-uploading .uploading {
    display: block;
  }
</style>

<form
  class="form-group"
  class:has-advanced-upload={isAdvancedUpload}
  class:is-dragover={entered}
  class:is-uploading={submitted}
  class:is-error={err}
  on:drag={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  on:dragstart|preventDefault|stopPropagation={enter}
  on:dragend|preventDefault|stopPropagation={end}
  on:dragover|preventDefault|stopPropagation={enter}
  on:dragenter|preventDefault|stopPropagation={enter}
  on:dragleave|preventDefault|stopPropagation={end}
  on:drop|preventDefault|stopPropagation={(e) => (droppedFiles = e.originalEvent.dataTransfer.files)}
  id="box"
  method="POST"
  action=""
  enctype="multipart/form-data">
  <div class="boxinput">
    <input
      class="boxfile form-control-file align-center col-form-label"
      type="file"
      name="files[]"
      id="file"
      data-multiple-caption="{droppedFiles.length} files selected"
      multiple />
    <label for="file" class="area bg-success">
      <strong>Choose a file</strong>
      <span class="dragndrop">or drag it here</span>
      .
    </label>
    <button class="btn btn-ternary" type="submit" on:submit={submitting}>
      Upload
    </button>
  </div>
  <div class="uploading alert alert-info" role="alert">Uploading&hellip;</div>
  <div class="success alert alert-success" role="alert">Done!</div>
  <div class="error alert alert-danger" role="alert">
    Error!
    <span />
    .
  </div>
</form>
