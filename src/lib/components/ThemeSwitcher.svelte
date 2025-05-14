<script>
    import { onMount } from "svelte";
    import defaultAppConfig from "$lib/app_config.json";

    let appConfig = $state(defaultAppConfig);
    let currentTheme = $state();

    onMount(() => {
        appConfig = JSON.parse(localStorage.getItem("app:config")) || defaultAppConfig;
        updateCurrentTheme()
        setTheme(currentTheme);
    });

    function updateCurrentTheme() {
        let placeholder = appConfig["theme"];
        currentTheme = placeholder != null ? placeholder : "dark";
    }
  
    function setTheme(theme) {
        if (theme == "dark") {
            document.body.classList.remove('light-theme');
            appConfig["theme"] = theme;
            localStorage.setItem("app:config", JSON.stringify(appConfig));
        } else if (theme == "light") {
            document.body.classList.add('light-theme');
            appConfig["theme"] = theme;
            localStorage.setItem("app:config", JSON.stringify(appConfig));
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