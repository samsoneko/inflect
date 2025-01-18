<script lang="ts">

    function navigateToHome() {
        window.location.href = '/';
    }

    function navigateToSearch() {
        window.location.href = '/search';
    }

    function navigateToMaterial() {
        window.location.href = '/material';
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
        <button class="icon-button" aria-label="Search" onclick={() => navigateToSearch()}>
            <i class="fas fa-magnifying-glass"></i>
            <!-- <p class="icon-button-label">Search</p> -->
        </button>
        <button class="icon-button" aria-label="Settings" onclick={() => navigateToMaterial()}>
            <i class="fas fa-book"></i>
            <!-- <p class="icon-button-label">Material</p> -->
        </button>
        <button class="icon-button" aria-label="Settings" onclick={() => navigateToSettings()}>
            <i class="fas fa-cog"></i>
            <!-- <p class="icon-button-label">Settings</p> -->
        </button>
    </nav>
</div>