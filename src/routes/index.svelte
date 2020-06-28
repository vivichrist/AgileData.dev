<script>
  import GoogleSignin from "./_google_signin.svelte";

  let images = ["/img/beach-island.webp", "/img/beach-sunset.webp"];

  const rndImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };
</script>

<style>
  footer {
    border-top: 3px solid white;
    padding: 0.5rem 1rem 0 1rem;
    margin-bottom: 2rem;
  }
  footer > span {
    font-size: 16pt;
    border-width: 2px;
  }
  .bgc {
    height: 100vh;
    background-position: center;
    background-size: 100vw;
  }
  /* @media only screen and (orientation: landscape) {
    @media screen and (min-width: 740px) {
    }
    @media screen and (max-width: 740px) {
    }
  }
  @media only screen and (orientation: portrait) {
  } */
</style>

<svelte:head>
  <title>AgileData Login - {process.env.STAMP}</title>
</svelte:head>

<div
  class="d-flex flex-column vw-100 align-items-center justify-content-between
  bgc"
  style="background-image: url({rndImage()});">
  <GoogleSignin />
  <footer>
    <span type="button" class="text-white mr-5">Terms of Use</span>
    <span type="button" class="text-white ml-5">Privacy</span>
  </footer>
</div>
