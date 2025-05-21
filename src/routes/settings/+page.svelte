<script lang="ts">
    import {onMount} from "svelte";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import ToggleSwitch from "$lib/components/ToggleSwitch.svelte";
    import defaultAppConfig from "$lib/app_config.json";
    import defaultLanguageConfig from "$lib/language_config.json";
    import DropDownMenu from "$lib/components/DropDownMenu.svelte";

    let appConfig = $state(defaultAppConfig);
    let languageIndex = $state();
    let languageConfig = $state(defaultLanguageConfig);

    onMount(async () => {
        appConfig = JSON.parse(localStorage.getItem("app:config")) || defaultAppConfig;
        languageIndex = await getLanguagesFromServer();
        languageConfig = JSON.parse(localStorage.getItem(appConfig["language"] + ":config")) || defaultLanguageConfig;
    });

    let previousLanguage = appConfig.language;

    $effect(() => {
        // Save app config
        localStorage.setItem("app:config", JSON.stringify(appConfig));

        // Only reload language config if language changed
        if (appConfig.language !== previousLanguage) {
            previousLanguage = appConfig.language;
            loadLanguageConfig(appConfig.language);
        }

        // Save current language config
        localStorage.setItem(appConfig.language + ":config", JSON.stringify(languageConfig));
    });

    async function getLanguagesFromServer() {
        let response = await fetch(`/api/data/languages`);
        let entry = await response.json();
        return entry
    }

    function loadLanguageConfig(languageCode: string) {
        languageConfig = JSON.parse(localStorage.getItem(languageCode + ":config")) || defaultLanguageConfig;
    }
</script>

<svelte:head>
    <title>Inflect - Settings</title>
</svelte:head>

<h1>Settings</h1>

<div class="page-section">
    <h2><i class="fas fa-gear"></i> General</h2>
    <div class="saber-panel-default">
        <h3>🎨App Theme</h3>
        <ThemeSwitcher bind:theme={appConfig["theme"]}/>
        <h3>🌐Language</h3>
        <div class="settings-option">
            <p class="settings-option-desc">Set the app language:</p>
            <div class="settings-option-toggle">
                <DropDownMenu options={languageIndex} bind:selected={appConfig["language"]}/>
            </div>
        </div>
    </div>
</div>

<!-- Only show language config when language list is loaded -->
{#if languageIndex}
<div class="page-section">
    <h2><i class="fas fa-globe"></i> Language - {languageIndex[appConfig["language"]]["name"]}</h2>
    <div class="saber-panel-default">
        <h3>📚Practise</h3>
        <div class="settings-option">
            <p class="settings-option-desc">Show accuracy during practise.</p>
            <div class="settings-option-toggle">
                <ToggleSwitch bind:checked={languageConfig["showAccuracy"]}/>
            </div>
        </div>
        <div class="settings-option">
            <p class="settings-option-desc">Allow questions to be skipped.</p>
            <div class="settings-option-toggle">
                <ToggleSwitch bind:checked={languageConfig["showSkipButton"]}/>
            </div>
        </div>
    </div>
</div>
{/if}

<div class="page-section">
    <h2><i class="fas fa-circle-info"></i> Information</h2>
    <div class="saber-panel-default">
        <div class="app-logo-div">
            <div class="app-title">
                <h3><img class="image-button" src="favicon.png" alt="App Logo"> Inflect</h3>
                <p>Version {PKG.version}</p>
            </div>
            <div class="app-language">
                <img class="flag" src="/fi.svg" alt="Language"/>
            </div>
        </div>
        <hr>
        <div class="app-description">
            <p>A simple webapp for studying vocabulary, mainly aimed at practicing inflection patterns and other word forms.</p>
            <p>Currently limited to Finnish vocabulary, but will be expanded to support other languages in the future.</p>            
            <p>Most data is sourced from Wiktionary and manually cleaned and formatted afterwards.</p>
            <p>©2025 Anton Caesar</p>
        </div>
    </div>
</div>

<style>
    .app-logo-div {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .app-title {
        grid-area: 1 / 1 / 2 / 2;
    }

    .app-language {
        grid-area: 1 / 2 / 2 / 3;
        background-color: none;
        text-align: right;
    }

    .flag {
        height: 4rem;
        margin-top: 15px;
        border-radius: 8px;
        box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.5);
    }

    .app-description {
        text-align: justify;
    }

    .settings-option {
        margin-bottom: 16px;
        width: 100%;
    }

    .settings-option-desc {
        display: inline;
    }

    .settings-option-toggle {
        display: inline;
        float: right;
        margin-top: -4px;
    }
</style>