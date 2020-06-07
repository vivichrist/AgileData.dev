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
    window.signOut = () => {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        $id = "";
        $name = "";
        $given_name = "";
        $family_name = "";
        $img_url = "";
        $email = "";
        $token = "";

        document.getElementById("SignInWrapper").style.display = "block";
        console.log("onsign-out");
      });
    };
  });
</script>

<button onclick="signOut">Sign out</button>
