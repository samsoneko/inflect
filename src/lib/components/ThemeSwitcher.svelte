<script>
    import { onMount } from "svelte";

    let currentTheme = $state();

    onMount(() => {
        updateCurrentTheme()
        setTheme(currentTheme);
    });

    function updateCurrentTheme() {
        let placeholder = localStorage.getItem('app:theme');
        currentTheme = placeholder != null ? placeholder : "dark";
    }
  
    function setTheme(theme) {
        if (theme == "dark") {
            document.body.classList.remove('light-theme');
            localStorage.setItem('app:theme', theme);
        } else if (theme == "light") {
            document.body.classList.add('light-theme');
            localStorage.setItem('app:theme', theme);
        }
        updateCurrentTheme();
    }
</script>

<div class="theme-selector">
    <button class={currentTheme === "dark" ? "saber-tab-button-default-active" : "saber-tab-button-default"} onclick={() => setTheme("dark")}>Dark</button>
    <button class={currentTheme === "light" ? "saber-tab-button-default-active" : "saber-tab-button-default"} onclick={() => setTheme("light")}>Light</button> 
</div>


<style>
    .theme-selector {
        max-width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 10px;
        margin-bottom: 10px;
    }
</style>