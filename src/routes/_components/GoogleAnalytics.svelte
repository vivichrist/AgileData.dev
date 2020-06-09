<script>
  window.dataLayer = window.dataLayer || [];
  window.gtag = () => {
    dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", "G-KJ5J48K166");

  import { stores } from "@sapper/app";
  const { page } = stores();

  $: {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-KJ5J48K166", {
        page_path: $page.path
      });
    }
  }
</script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-KJ5J48K166">

  </script>
</svelte:head>
