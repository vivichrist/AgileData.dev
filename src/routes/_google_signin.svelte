<script>

</script>

<!-- <div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn" /> -->
<div id="SignInWrapper" class="d-block align-center flex-grow-1">
  <div class="lc">
    <img id="logo" src="/agiledata-logo-icon-white.svg" alt="agile data logo"/>
  </div>
  <a id="customBtn" class="SignIn btn border-0"
     href="app/catalog" role="button">
    <i class="fab fa-google mr-2"></i>
    <span class="text-ternsry align-center">Login</span>
  </a>
</div>

<style>
    #logo {
    height: 80px;
    box-shadow: none;
    text-align: center;
  }
  .lc {
    margin-top: 35vh;
    text-align: center;
  }
  #customBtn {
    color: var(--ternary);
    background-color: white;
    background-blend-mode: color-burn;
    margin-top: 2vh;
    width: 10em;
  }
  #customBtn:hover {
    cursor: pointer;
  }
</style>