<svelte:head>
  <script>
    window.signOut = () => {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("given_name");
        sessionStorage.removeItem("family_name");
        sessionStorage.removeItem("img_url");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("token");

        document.getElementById("SignInWrapper").style.display = "block";
        console.log("onsign-out");
      });
    }
  </script>
</svelte:head>

<a onclick="signOut">Sign out</a>
