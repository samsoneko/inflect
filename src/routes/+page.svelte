<script lang='ts'>
    import { onMount } from "svelte";
    import CategoryBlock from "$lib/components/CategoryBlock.svelte";
    import defaultAppConfig from "$lib/app_config.json";
    import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";

    let appConfig = $state(defaultAppConfig);
    let lessonConf = $state();

    onMount(async () => {
        appConfig = JSON.parse(localStorage.getItem("app:config")) || defaultAppConfig;
        lessonConf = await getLessonConfFromServer(appConfig.language);
    });

    async function getLessonConfFromServer(language : string) {
        let response = await fetch(`/api/lessons/${language}`);
        let lessons = await response.json();
        return lessons
    }
</script>

<svelte:head>
    <title>Inflect - Home</title>
</svelte:head>

<h1 class="homepage-title">Hyvää Päivää!☀️</h1>

<div class="page-section">
    <div class="saber-panel-default saber-border-warn disclaimer center-text">
        <h3><i class="fas fa-triangle-exclamation"></i> Disclaimer</h3>
        <p>This application is still in early development.</p>
        <p>Although basic functions do exist, no guarantee for the correctness of information can be given.</p>
    </div>
</div>

<div class="page-section">
    <h2><i class="fas fa-book"></i> Study</h2>
    <div class="category-div">
        {#if lessonConf}
            {#each Object.entries(lessonConf) as [lesson, content]}
                <CategoryBlock
                    name={content.lesson_name}
                    color={content.color}
                    lesson_path={"study/textinput?lesson="+content.lesson_type}
                    settings_path={"study/textinput/settings?lesson="+content.lesson_type}
                    description={content.description}
                    tags={content.tags}
                />
            {/each}
        {:else}
            <LoadingAnimation/>
        {/if}
    </div>
</div>

<style>
    .category-div {
        max-width: 100%;
        display: grid;
        column-gap: 10px;
        row-gap: 10px;
    }

    .tab-buttons {
        max-width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 10px;
        row-gap: 10px;
        margin-bottom: 10px;
    }

    .homepage-title {
        margin-top: 32px;
        margin-bottom: 48px;
        font-size: 2.2em;
        text-align: center;
    }
</style>