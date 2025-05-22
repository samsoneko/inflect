<script>
    import {onMount} from "svelte";
    import defaultAppConfig from "$lib/app_config.json";

    let appConfig = $state(defaultAppConfig);
    let languageIndex = $state({"placeholder": {"name": "placeholder"}}); // Array of strings

    onMount(async () => {
        appConfig = JSON.parse(localStorage.getItem("app:config")) || defaultAppConfig;
        languageIndex = await getLanguagesFromServer();
    });

    async function getLanguagesFromServer() {
        let response = await fetch(`/api/data/languages`);
        let entry = await response.json();
        return entry
    }
</script>

<h1>Language Select</h1>

<div class="page-section">
    {#each Object.keys(languageIndex) as language}
    <div class="language-option saber-panel-default">
        <img class="flag" src="/{language}.svg" alt="Language"/>
        <p class="language-title">{languageIndex[language].name}</p>
        <button class="language-button saber-button-default" value={language}>Select</button>
    </div>
    {/each}
    <button class="saber-button-default"><a class="navbar-icon" href="/settings" aria-label="Material"><i class="fas fa-globe"></i> Cancel</a></button>
</div>

<style>
    .language-overlay {
        position: absolute;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .language-info-container {
        padding: 16px;
        margin: 20px;
        top: 50%;
        width: 100%;
        height: max-content;
        border: var(--border);
        background-color: var(--layer-1);
        color: var(--text-color);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius);
    }

    .language-title {
        font-size: 1.2em;
        padding: 0px;
        margin: 0px;
    }

    .language-button {
        padding: 8px;
        font-size: 1em;
        border-radius: 8px;
    }

    .language-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
    }

    .flag {
        height: 2em;
        border-radius: 8px;
        box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.5);
    }
</style>