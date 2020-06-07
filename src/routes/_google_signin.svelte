<script>
  import { onMount } from "svelte";
  import {
    id,
    name,
    given_name,
    family_name,
    img_url,
    email,
    token
  } from "../stores.js";

  onMount(() => {
    window.onSignIn = user => {
      // Useful data for your client-side scripts:
      const profile = user.getBasicProfile();
      // The ID token you need to pass to your backend:
      $id = profile.getId();
      $name = profile.getName();
      $given_name = profile.getGivenName();
      $family_name = profile.getFamilyName();
      $img_url = profile.getImageUrl();
      $email = profile.getEmail();
      $token = user.getAuthResponse().id_token;

      document.getElementById("SignInWrapper").style.display = "none";
      console.log("onsign-in");
    };
    window.startApp = function() {
      gapi.load("auth2", function() {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        let auth2 = gapi.auth2.init({
          client_id:
            "865193817161-j3sjhd6d09488ih4lnnijhqvdsvud2pq.apps.googleusercontent.com",
          cookiepolicy: "agiledata.io agiledata-dev.now.sh",
          scope: "profile email"
        });
        let element = document.getElementById("customBtn");
        auth2.attachClickHandler(
          element,
          {},
          function(user) {
            console.log(user);
            onSignIn(user);
          },
          function(error) {
            alert(JSON.stringify(error, undefined, 2));
            document.getElementById(
              "SignInWrapper"
            ).innerHTML += `<div class="alert alert-danger" role="alert">
                ${error}
              </div>`;
          }
        );
      });
    };
  });
</script>

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
    margin-top: 2vh;
    width: 10em;
  }
  #customBtn:hover {
    cursor: pointer;
  }
</style>

<!-- <div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn" /> -->
<div
  id="SignInWrapper"
  class="d-block align-center flex-grow-1"
  onload="startApp();">
  <div class="lc">
    <img id="logo" src="/agiledata-logo-icon-white.svg" alt="agile data logo" />
  </div>
  <a
    id="customBtn"
    class="SignIn btn border-0"
    href="app/catalog"
    role="button">
    <i class="fab fa-google mr-2" />
    <span class="text-ternsry align-center">Login</span>
  </a>
</div>
