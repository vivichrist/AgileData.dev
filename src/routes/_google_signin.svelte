<svelte:head>
  <script src="https://apis.google.com/js/api:client.js" async defer></script>
  <script>
    window.onSignIn = (user) => {
      // Useful data for your client-side scripts:
      const profile = user.getBasicProfile();
      // The ID token you need to pass to your backend:
      sessionStorage.id = profile.getId();
      sessionStorage.name = profile.getName();
      sessionStorage.given_name = profile.getGivenName();
      sessionStorage.family_name = profile.getFamilyName();
      sessionStorage.img_url = profile.getImageUrl();
      sessionStorage.email = profile.getEmail();
      sessionStorage.token = user.getAuthResponse().id_token;

      document.getElementById("SignInWrapper").style.display = "none";
      console.log("onsign-in");
    }
    window.startApp = function() {
      gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        let auth2 = gapi.auth2.init({
          client_id: '461979086851-bbjhehqb9qpn3boroii8l4klmcc718bd.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        });
        let element = document.getElementById('customBtn');
        auth2.attachClickHandler(element, {},
          function(user) {
            onSignIn(user);
          }, function(error) {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      });
    };
  </script>
</svelte:head>

<script>

</script>

<!-- <div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn" /> -->
<div id="SignInWrapper" class="d-block align-center flex-grow-1">
  <div class="lc">
    <img id="logo" src="/agiledata-logo-icon-white.svg" alt="agile data logo"/>
  </div>
  <a id="customBtn" class="SignIn btn btn-outline-primary border-0"
     href="app/catalog" on:click="{() => window.onSignIn}" role="button">
    <span class="text-info align-center">Login</span>
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
    background-color: #755A9955;
    background-blend-mode: color-burn;
    margin-top: 2vh;
    width: 15rem;
  }
  #customBtn:hover {
    cursor: pointer;
  }
</style>