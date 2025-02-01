<script>
    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";
    import lessonConfig from "$lib/textinput/lesson_conf.json";

    let languageParam = $state("");
    let lessonParam = $state("");

    let currentLessonConfig = $state(lessonConfig["noun-declination"]);
    let availableCategories = $state();
    let availableCategoryData = $state();

    let activeCategorySelectors = $state([[]]);
    let isViableConfiguration = $state(true);

    $effect(() => {
        const searchParams = $page.url.searchParams;
        if (languageParam == "" && lessonParam == "") {
            languageParam = searchParams.get("lang");
            lessonParam = searchParams.get("lesson");
        }
    });

    $effect(() => {
        isViableConfiguration = true;
        for (let i = 0; i < activeCategorySelectors.length; i++) {
            if (activeCategorySelectors[i].length < 1) {
                isViableConfiguration = false;
            }
        }
    });

    onMount(() => {
        // Your function to execute on page load
        currentLessonConfig = lessonConfig[lessonParam];
        loadActiveCategories();
    });

    function loadActiveCategories() {
        availableCategories = currentLessonConfig.categories;
        availableCategoryData = currentLessonConfig.category_data;
        activeCategorySelectors =
            JSON.parse(
                localStorage.getItem(
                    currentLessonConfig.lesson_type + "Config",
                ),
            ) || currentLessonConfig.category_data.slice();
    }

    function saveConfig() {
        localStorage.setItem(
            currentLessonConfig.lesson_type + "Config",
            JSON.stringify(activeCategorySelectors),
        );
        window.location.href = "/";
    }

    function resetSelection() {
        activeCategorySelectors = currentLessonConfig.category_data.slice();
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>

<h1 class="page-title">
    {capitalize(currentLessonConfig.lesson_type)} Settings
</h1>

<div class="saber-panel-default">
    Select as many entries for each category as you want to practise in the
    lesson. However, you have to select at least one entry per category to get a
    viable configuration.
</div>

<div class="saber-panel-default">
    {#each availableCategories as category, i}
        <h2 class="section-title">{capitalize(category)}</h2>
        {#each availableCategoryData[i] as category_data}
            <div>
                <input
                    type="checkbox"
                    name={category_data}
                    value={category_data}
                    bind:group={activeCategorySelectors[i]}
                />
                <label for={category_data}>{category_data}</label>
            </div>
        {/each}
    {/each}
</div>

<div class="center-text bottom-buttons">
    {#if isViableConfiguration}
        <button class="saber-button-default saber-color-confirm" aria-label="Save" onclick={saveConfig}>
            <i class="fas fa-floppy-disk"></i> Save Config
        </button>
    {:else}
        Select at least one entry for each category.
    {/if}

    <button
        class="saber-button-default saber-color-error"
        aria-label="Reset Selection"
        onclick={resetSelection}
    >
        <i class="fas fa-rotate-left"></i> Reset Selection
    </button>
</div>

<style>
    .bottom-buttons {
        margin-top: 20px;
    }
</style>
