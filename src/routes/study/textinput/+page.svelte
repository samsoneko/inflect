<script lang="ts">
    import { onMount, tick } from "svelte";
    import AccuracyDisplay from "$lib/components/AccuracyDisplay.svelte";
    import defaultAppConfig from "$lib/app_config.json";
    import defaultLanguageConfig from "$lib/language_config.json";
    import { collectAllLeafs } from '$lib/utils/json-utils.ts';
    import type { WordEntry } from "$lib/types";
    import { page } from '$app/stores';

    let languageConfig = $state(defaultLanguageConfig);

    let appConfig = $state(defaultAppConfig);

    let serversideEntry : WordEntry;
    let lessonLabels;
    let current_lesson = $state();
    let lessonParam;
    let inflectionSubDir = {};

    // Variables holding information about the current question
    let currentWord = $state("");
    let currentTranslation = $state("");

    let selectionConfig = $state();
    let currentPathCategories = $state([]);

    // Variables for holding information about the solution
    let currentSolution = $state([]);

    // Variables holding information about the current answer
    let currentAnswer = $state("");
    let answerState = $state("unanswered");

    let totalAnswerCount = $state(0);
    let correctAnswerCount = $state(0);

    // On page load, initialize data and load first question
    onMount(async () => {
        appConfig = JSON.parse(localStorage.getItem("app:config")) || defaultAppConfig;
        const searchParams = $page.url.searchParams;
        lessonParam = searchParams.get('lesson');
        let lessonConf = await getLessonConfFromServer(appConfig.language);
        current_lesson = lessonConf[lessonParam];
        lessonLabels = await getLabelsFromServer(appConfig.language, current_lesson.set);
        serversideEntry = await getJSONEntryFromServer(appConfig.language, current_lesson.set, current_lesson.data_file, "random") as WordEntry;
        if (current_lesson.hasOwnProperty("sub_dir")) {
            inflectionSubDir = serversideEntry["inflection"][current_lesson.sub_dir];
        } else {
            inflectionSubDir = serversideEntry["inflection"];
        }
        loadLessonConfig();
        nextQuestion();
        languageConfig = JSON.parse(localStorage.getItem(appConfig.language + ":config")) || defaultLanguageConfig;
    });

    // Load the data for the current lesson
    function loadLessonConfig() {
        selectionConfig = JSON.parse(localStorage.getItem(appConfig.language + ":" + current_lesson.lesson_type + ":" + "config",)) || collectAllLeafs(inflectionSubDir);
    }

    // Variables for handling the input and confirm button
    let answerInputField;
    let nextQuestionButton;

    async function getJSONEntryFromServer(language : string, set : string, lesson : string, id) {
        let response = await fetch(`/api/data/${language}/${set}/${lesson}/${id}`);
        let entry = await response.json();
        return entry
    }

    async function getLabelsFromServer(language : string, set : string) {
        let response = await fetch(`/api/labels/${language}/${set}`);
        let labels = await response.json();
        return labels
    }

    async function getLessonConfFromServer(language : string) {
        let response = await fetch(`/api/lessons/${language}`);
        let lessons = await response.json();
        return lessons
    }

    // Loading the next question based on a random index
    async function nextQuestion() {
        // Get a (random) entry from the lesson resouce file
        serversideEntry = await getJSONEntryFromServer(appConfig.language, current_lesson.set, current_lesson.data_file, "random") as WordEntry;
        answerInputField.focus();
        currentAnswer = "";
        currentPathCategories = [];
        answerState = "unanswered";
        currentWord = serversideEntry["word"]; // Load the word
        currentTranslation = serversideEntry["translation"]; // Load the translation
        
        // Get a random inflection from the entry
        let randomSelectionPath = selectionConfig[Math.floor(Math.random() * selectionConfig.length,)];
        if (current_lesson.hasOwnProperty("sub_dir")) {
            inflectionSubDir = serversideEntry["inflection"][current_lesson.sub_dir];
        } else {
            inflectionSubDir = serversideEntry["inflection"];
        }
        let solutionEntry = String(getValueFromPath(inflectionSubDir, randomSelectionPath)); // Convert the entry to a string

        // Handle situations where multiple answers exist
        if (solutionEntry.indexOf(",") != -1) {
            currentSolution = String(solutionEntry).split(",");
        } else {
            currentSolution = [solutionEntry];
        }
        if (languageConfig["caseSensitiveAnswers"] == false) {
            for (let i = 0; i < currentSolution.length; i++) {
                currentSolution[i] = currentSolution[i].toLowerCase();
            }
        }

        // Skip to next question if the solution is not valid, TODO: what if all solutions are not valid?
        if (solutionEntry == "" || solutionEntry =="—") {
            nextQuestion();
        }
    }

    function getValueFromPath(data: any, path: string): any{
        const keys = path.split('/');

        let value = data;
        for (const key of keys) {
            if (value && typeof value == 'object' && key in value) {
                value = value[key];
                currentPathCategories.push(key);
            } else {
                return undefined;
            }
        }
        return value;
    }

    // Check if the answer is correct
    function checkAnswer(e) {
        e.preventDefault(); // Prevent site from reloading when "sending" the form
        if (languageConfig["caseSensitiveAnswers"] == false) {
            currentAnswer = currentAnswer.toLowerCase();
        }
        if (currentSolution.includes(currentAnswer)) {
            if (answerState == "unanswered") {
                totalAnswerCount += 1;
                correctAnswerCount += 1;
            }
            answerState = "correct";
            tick();
            answerInputField.blur();
            nextQuestionButton.focus();
        } else {
            answerInputField.focus();
            if (answerState == "unanswered") {
                totalAnswerCount += 1;
            }
            answerState = "wrong";
        }
    }
</script>

<svelte:head>
    {#if current_lesson}
    <title>Inflect - {current_lesson.lesson_name}</title>
    {/if}
</svelte:head>

{#if current_lesson}
<h1 class="page-title">{current_lesson.lesson_name}</h1>
{/if}

{#if languageConfig["showAccuracy"] == true}
    <AccuracyDisplay totalAnswerCount={totalAnswerCount} correctAnswerCount={correctAnswerCount} />
{/if}

<div class="saber-panel-default flashcard center-text">
    <h1 class="word">{currentWord}</h1>
    <p class="translation">{currentTranslation}</p>
    <div class="category-holder">
        {#each currentPathCategories as category_entry}
            {#if lessonLabels.hasOwnProperty(category_entry)}
                <p class="category-tag">{lessonLabels[category_entry]}</p>
            {:else}
                <p class="category-tag">{category_entry}</p>
            {/if}
        {/each}
    </div>
    <form autocomplete="off" onsubmit={checkAnswer}>
        <input class="saber-input-default answer-input" type="text" bind:this={answerInputField} id="query" bind:value={currentAnswer} placeholder="Enter your answer"/>
        <button class="saber-button-default saber-color-confirm" aria-label="Search" type="submit">Check<i class="fas fa-check"></i></button>
    </form>
</div>

{#if answerState == "correct"}
    <div class="saber-panel-default saber-border-confirm center-text">
        <h2>Correct!</h2>
        {#if currentSolution.length > 1}
            <p>All variants of this word are:</p>
            <h3>{currentSolution}</h3>
        {/if}
        <button class="saber-button-default saber-color-confirm" aria-label="Search" bind:this={nextQuestionButton} onclick={() => nextQuestion()} autofocus>
            <i class="fas fa-arrow-right"></i>
        </button>
    </div>
{:else if answerState == "wrong"}
    <div class="saber-panel-default saber-border-error center-text">
        <h2>Wrong!</h2>
        <p>The right answer would have been:</p>
        <h3>{currentSolution}</h3>
    </div>
{/if}

{#if languageConfig["showSkipButton"] == true}
    <div class="center-text">
        <button class="saber-button-default saber-color-warn" aria-label="Search" onclick={() => nextQuestion()}>
            Skip Question
            <i class="fas fa-forward"></i>
        </button>
    </div>
{/if}

<style>
    .flashcard {
        border-radius: var(--border-radius);
    }

    .word {
        margin-bottom: 0px;
    }

    .category-holder {
        margin-bottom: 30px;
    }

    .category-tag {
        background-color: var(--layer-2);
        width: max-content;
        display: inline-block;
        margin: 4px;
        padding: 8px;
        border: 1px solid var(--layer-1-active);
        border-radius: var(--border-radius);
        /* white-space: nowrap; */
    }

    .translation {
        color: var(--subtle-text-color);
        margin-top: 0px;
        margin-bottom: 30px;
    }

    .answer-input {
        border-radius: var(--border-radius);
        flex: 1;
        background-color: var(--layer-0);
    }
</style>
