<script>
    let {children} = $props();

    function navigateToHome() {
        window.location.href = '/';
    }

    function navigateToSettings() {
        window.location.href = '/settings';
    }
</script>

<div class="app-frame">
    <nav class="navbar">
        <button class="icon-button" aria-label="Home" onclick={() => navigateToHome()}>
            <i class="fas fa-home"></i>
        </button>
        <button class="image-button" aria-label="Home">
            <img src="/fi.svg" alt="Language" class="button-image"/>
        </button>
        <button class="icon-button" aria-label="Settings" onclick={() => navigateToSettings()}>
            <i class="fas fa-cog"></i>
        </button>
    </nav>
    <div class="app-content">
        <slot />
    </div>
</div>