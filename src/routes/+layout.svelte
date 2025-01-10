<script>
    let {children} = $props();

    function navigateToHome() {
        window.location.href = '/';
    }

    function navigateToSettings() {
        window.location.href = '/settings';
    }
    
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

<div class="app-frame">
    <div class="app-content">
        <slot />
    </div>

    <nav class="navbar">
        <button class="icon-button" aria-label="Home" onclick={() => navigateToHome()}>
            <i class="fas fa-home"></i>
            <!-- <p class="icon-button-label">Home</p> -->
        </button>
        <button class="image-button" aria-label="Home">
            <img src="/fi.svg" alt="Language" class="button-image"/>
            <!-- <p class="icon-button-label">Language</p> -->
        </button>
        <button class="icon-button" onclick={() => toggleTheme()}>
            {#if lightMode}
                <i class="fas fa-moon"></i>
            {:else}
                <i class="fas fa-sun"></i>
            {/if}
            <!-- <p class="icon-button-label">Theme</p> -->
        </button>
        <button class="icon-button" aria-label="Settings" onclick={() => navigateToSettings()}>
            <i class="fas fa-cog"></i>
            <!-- <p class="icon-button-label">Settings</p> -->
        </button>
    </nav>
</div>