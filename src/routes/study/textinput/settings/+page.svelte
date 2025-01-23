<script>
    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";
    import lesson_conf from "$lib/textinput/lesson_conf.json";

    let languageParam = $state("");
    let lessonParam = $state("");

    let current_lesson_conf = $state(lesson_conf["noun-declination"]);
    let available_categories = $state();
    let available_category_data = $state();

    let active_category_selectors = $state([[]]);
    let viableConfiguration = $state(true);

    $effect(() => {
        const searchParams = $page.url.searchParams;
        if (languageParam == "" && lessonParam == "") {
            languageParam = searchParams.get("lang");
            lessonParam = searchParams.get("lesson");
        }
    });

    $effect(() => {
        viableConfiguration = true;
        for (let i = 0; i < active_category_selectors.length; i++) {
            if (active_category_selectors[i].length < 1) {
                viableConfiguration = false;
            }
        }
    });

    onMount(() => {
        // Your function to execute on page load
        current_lesson_conf = lesson_conf[lessonParam];
        loadActiveCategories();
    });

    function loadActiveCategories() {
        available_categories = current_lesson_conf.categories;
        available_category_data = current_lesson_conf.category_data;
        active_category_selectors =
            JSON.parse(
                localStorage.getItem(
                    current_lesson_conf.lesson_type + "Config",
                ),
            ) || current_lesson_conf.category_data.slice();
    }

    function saveConfig() {
        localStorage.setItem(
            current_lesson_conf.lesson_type + "Config",
            JSON.stringify(active_category_selectors),
        );
        window.location.href = "/";
    }

    function resetSelection() {
        active_category_selectors = current_lesson_conf.category_data.slice();
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>

<h1 class="page-title">
    {capitalize(current_lesson_conf.lesson_type)} Settings
</h1>

<div class="saber-panel-default">
    Select as many entries for each category as you want to practise in the
    lesson. However, you have to select at least one entry per category to get a
    viable configuration.
</div>

<div class="saber-panel-default">
    {#each available_categories as category, i}
        <h2 class="section-title">{capitalize(category)}</h2>
        {#each available_category_data[i] as category_data}
            <div>
                <input
                    type="checkbox"
                    name={category_data}
                    value={category_data}
                    bind:group={active_category_selectors[i]}
                />
                <label for={category_data}>{category_data}</label>
            </div>
        {/each}
    {/each}
</div>

<div class="center-text bottom-buttons">
    {#if viableConfiguration}
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
