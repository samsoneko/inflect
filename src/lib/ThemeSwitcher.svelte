<script>
    let isLightMode = $state(false);

    // Load the saved theme from localStorage
    if (typeof window !== 'undefined') {
        isLightMode = localStorage.getItem('theme') === 'light';
        document.body.classList.toggle('light-theme', isLightMode);
    }
  
    function toggleTheme() {
        isLightMode = !isLightMode;
        document.body.classList.toggle('light-theme', isLightMode);
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    }
</script>
  
<button class="default-element" onclick={() => toggleTheme()}>
    {isLightMode ? '🎨Switch to Dark Mode' : '🎨Switch to Light Mode'}
</button>

<!-- <button class="icon-button" onclick={() => toggleTheme()}>
    {#if lightMode}
        <i class="fas fa-moon"></i>
    {:else}
        <i class="fas fa-sun"></i>
    {/if}
</button> -->