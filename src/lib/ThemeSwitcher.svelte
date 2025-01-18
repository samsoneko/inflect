<script>
    let lightMode = $state(false);

    // Load the saved theme from localStorage
    if (typeof window !== 'undefined') {
        lightMode = localStorage.getItem('theme') === 'light';
        document.body.classList.toggle('light-theme', lightMode);
    }
  
    function toggleTheme() {
        lightMode = !lightMode;
        document.body.classList.toggle('light-theme', lightMode);
        localStorage.setItem('theme', lightMode ? 'light' : 'dark');
    }
</script>
  
<button class="default-element" onclick={() => toggleTheme()}>
    {lightMode ? '🎨Switch to Dark Mode' : '🎨Switch to Light Mode'}
</button>

<!-- <button class="icon-button" onclick={() => toggleTheme()}>
    {#if lightMode}
        <i class="fas fa-moon"></i>
    {:else}
        <i class="fas fa-sun"></i>
    {/if}
</button> -->