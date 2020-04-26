<script>
  let images = ["/img/male-character-comming-soon.webp",
               "/img/female-character-coming-soon.webp"];

  const rndImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };
</script>

<style>
  div {
    background-position: center;
    background-size: 80vh;
    background-repeat: no-repeat;
    height: 85vh;
    width: 85vw;
  }
</style>

<div class="d-flex flex-column" style="background-image: url({rndImage()});" />
