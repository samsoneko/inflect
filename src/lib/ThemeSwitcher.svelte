<script>
    import { onMount } from "svelte";

    let currentTheme = $state();

    onMount(() => {
        updateCurrentTheme()
        setTheme(currentTheme);
    });

    function updateCurrentTheme() {
        let placeholder = localStorage.getItem('theme');
        currentTheme = placeholder != null ? placeholder : "dark";
    }
  
    function setTheme(theme) {
        if (theme == "black") {
            document.body.classList.add('black-theme');
            document.body.classList.remove('light-theme');
            document.body.classList.remove('saber-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "dark") {
            document.body.classList.remove('light-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('saber-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "light") {
            document.body.classList.add('light-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('saber-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "saber") {
            document.body.classList.add('saber-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', theme);
        }
        updateCurrentTheme();
    }
</script>

<div class="theme-selector">
    <button class={currentTheme === "black" ? "theme-button-active" : "theme-button"} onclick={() => setTheme("black")}>Black</button>
    <button class={currentTheme === "dark" ? "theme-button-active" : "theme-button"} onclick={() => setTheme("dark")}>Dark</button>
    <button class={currentTheme === "light" ? "theme-button-active" : "theme-button"} onclick={() => setTheme("light")}>Light</button>
    <button class={currentTheme === "saber" ? "theme-button-active" : "theme-button"} onclick={() => setTheme("saber")}>Saber</button>  
</div>


<style>
    .theme-selector {
        display: flex;
        justify-content: space-around;
        gap: 8px;
    }

    .theme-button {
        text-align: center;
        border: var(--border);
        background-color: var(--layer-2);
        width: 100%;
        padding: 8px;
        box-shadow: var(--box-shadow);
        border-radius: calc(var(--border-radius) - 4px);
        color: var(--text-color);
    }

    .theme-button-active {
        text-align: center;
        border: var(--border);
        background-color: var(--layer-1-active);
        width: 100%;
        padding: 8px;
        box-shadow: var(--box-shadow);
        border-radius: calc(var(--border-radius) - 4px);
        color: var(--text-color);
    }

</style>