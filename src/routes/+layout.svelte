<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        let theme = localStorage.getItem('theme');
        if (theme == "black") {
            document.body.classList.add('black-theme');
            document.body.classList.remove('light-theme');
            document.body.classList.remove('jungle-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "dark") {
            document.body.classList.remove('light-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('jungle-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "light") {
            document.body.classList.add('light-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('jungle-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "jungle") {
            document.body.classList.add('jungle-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', theme);
        }
    });

</script>

<div class="app-frame">
    <div class="app-content">
        <slot />
    </div>

    <nav class="navbar">
        <button class="icon-button" aria-label="Home">
            <a class="navbar-icon" href="/" aria-label="Home"><i class="fas fa-home"></i></a>
            <!-- <p class="icon-button-label">Home</p> -->
        </button>
        <button class="icon-button" aria-label="Search">
            <a class="navbar-icon" href="/search" aria-label="Search"><i class="fas fa-magnifying-glass"></i></a>
            <!-- <p class="icon-button-label">Search</p> -->
        </button>
        <button class="icon-button" aria-label="Material">
            <a class="navbar-icon" href="/material" aria-label="Material"><i class="fas fa-book"></i></a>
            <!-- <p class="icon-button-label">Material</p> -->
        </button>
        <button class="icon-button" aria-label="Settings">
            <a class="navbar-icon" href="/settings" aria-label="Settings"><i class="fas fa-cog"></i></a>
            <!-- <p class="icon-button-label">Settings</p> -->
        </button>
    </nav>
</div>

<style>
    .navbar-icon {
        color: var(--color);
        width: 100%;
        height: 100%;
    }
</style>