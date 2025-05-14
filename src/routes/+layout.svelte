<script lang="ts">
    import { onMount } from "svelte";
    import defaultAppConfig from "$lib/app_config.json";

    onMount(() => {
        loadConfig();
        checkVersion();
    });

    let showUpdateNotice = false;
    let appServerVersion = PKG.version;
    let appLocalVersion = "";

    function checkVersion() {
        appLocalVersion = localStorage.getItem('app:localVersion');
        if (appLocalVersion != null) {
            if (appLocalVersion != appServerVersion) {
                showUpdateNotice = true;
            }
        }
        else {
            showUpdateNotice = true;
        }
    }

    function loadConfig() {
        let appConfig = JSON.parse(localStorage.getItem("app:config")) || defaultAppConfig;
        let theme = appConfig["theme"];
        if (theme == "dark") {
            document.body.classList.remove('light-theme');
            appConfig["theme"] = theme;
            localStorage.setItem("app:config", JSON.stringify(appConfig));
        } else if (theme == "light") {
            document.body.classList.add('light-theme');
            appConfig["theme"] = theme;
            localStorage.setItem("app:config", JSON.stringify(appConfig));
        }
    }

    function purgeLocalStorage() {
        localStorage.clear();
        localStorage.setItem('app:localVersion', appServerVersion);
        showUpdateNotice = false;
        loadConfig();
    }

</script>

<div class="app-frame">
    <div class="app-content">
        <slot />
    </div>

    {#if showUpdateNotice}
    <div class="update-overlay">
        <div class="update-info-container">
            <h1>🎉Update Notice🎉</h1>
            <p>A new version of the app has been released: Version {appServerVersion}</p>
            <hr>
            <p>For the full changelog and further information, please visit:</p>
            <a href="https://github.com/samsoneko/sabercards">https://github.com/samsoneko/sabercards</a>
            <hr>
            <p>Please notice that your local settings may need to be reset due to changes in the background.</p>
            <div class="center-text">
                <button class="saber-button-default saber-color-confirm" aria-label="Search" onclick={() => purgeLocalStorage()}>
                    I got it, continue to the App
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
    {/if}

    {#if !showUpdateNotice}
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
    {/if}
</div>

<style>
    .navbar-icon {
        color: var(--color);
        width: 100%;
        height: 100%;
    }

    .update-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .update-info-container {
        padding: 16px;
        margin: 20px;
        height: max-content;
        border: var(--border);
        background-color: var(--layer-1);
        color: var(--text-color);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius);
    }
</style>