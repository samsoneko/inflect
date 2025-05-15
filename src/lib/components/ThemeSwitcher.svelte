<script>
    import { onMount } from "svelte";
    export let theme = "dark";

    onMount(() => {
        setTheme(theme);
    });
  
    function setTheme(new_theme) {
        theme = new_theme;
        if (theme == "dark") {
            document.body.classList.remove('light-theme');
        } else if (theme == "light") {
            document.body.classList.add('light-theme');
        }
    }
</script>

<div class="theme-selector">
    <button class={theme === "dark" ? "saber-tab-button-default-active" : "saber-tab-button-default"} onclick={() => setTheme("dark")}>Dark</button>
    <button class={theme === "light" ? "saber-tab-button-default-active" : "saber-tab-button-default"} onclick={() => setTheme("light")}>Light</button> 
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