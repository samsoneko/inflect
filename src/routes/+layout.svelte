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

<style>

:global(body) {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: rgb(0, 0, 0);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.app-frame {
    width: 400px;
    height: 800px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 2px solid rgba(255, 255, 255, 0.05);
    overflow-y: auto;
    background-color: #07111c;
}

.app-frame::-webkit-scrollbar {
  display: none;
}

.app-content {
    padding: 10px 10px 0px 10px;
}

:global(.inflection-table) {
    background-color: rgba(255, 255, 255, 0.05);
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    width: 100%;
    border-radius: 10px;
}

:global(a) {
    color: lightskyblue;
    text-decoration: none;
}

:global(.navbar) {
    background-color: rgba(255, 255, 255, 0.09);
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

:global(.search-panel) {
    text-align: center;
}

:global(.learn-panel) {
    
}

:global(.default-element) {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    background-color: rgba(255, 255, 255, 0.05);
    color: white;
    box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.6);
}

:global(button, form) {
    display: inline;
}

:global(.style-button) {
    background-color: #003366;
    border: 1px solid #004080;
}

:global(.icon) {
    width: 3em;
    height: 3em;
}

:global(.icon-button) {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: inline;
    align-items: center;
    color: white;
}

:global(.button-image) {
    height: 1.5rem;
}

.image-button {
    background: none;
    border: none;
    cursor: pointer;
}
</style>