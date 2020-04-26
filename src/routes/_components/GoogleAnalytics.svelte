<script>
  import { stores } from '@sapper/app';
  const { page } = stores();
  $: {
    if (typeof gtag !== "undefined"){
      gtag("config", "G-KJ5J48K166", {
        page_path: $page.path
      });
    }
  }
</script>