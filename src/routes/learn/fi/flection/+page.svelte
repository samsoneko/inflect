<script>
    import { onMount } from 'svelte';
    import adjectives from '$lib/learn/fi/adjectives.json';
  
    onMount(() => {
      // Your function to execute on page load
      console.log("Page has loaded!");
      showCard();
    });

    function showCard() {
    }
</script>

{@debug adjectives}

{adjectives.vanha.translation}