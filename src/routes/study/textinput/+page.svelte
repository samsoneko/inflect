<script lang="ts">
    import { onMount, tick } from "svelte";
    import AccuracyDisplay from "$lib/AccuracyDisplay.svelte";
    import defaultAppConfig from "$lib/app_config.json";
    import { collectAllLeafs } from '$lib/utils/json-utils.ts';

    let { data } = $props();
    let appConfig = $state(defaultAppConfig);

    let lessonData = data.lessonData;
    let dataHead = lessonData[0]["inflection"][data.lessonConf.sub_object];

    // Variables holding information about the current question
    let currentWord = $state("");
    let currentTranslation = $state("");

    let selectionConfig = $state();
    let currentPathCategories = $state([]);

    // Variables for holding information about the solution
    let currentSolution = $state([]);
    let debug = $state(collectAllLeafs(dataHead));

    // Variables holding information about the current answer
    let currentAnswer = $state("");
    let answerState = $state("unanswered");

    let totalAnswerCount = $state(0);
    let correctAnswerCount = $state(0);

    // On page load, initialize data and load first question
    onMount(() => {
        loadLessonConfig();
        nextQuestion();
        appConfig = JSON.parse(localStorage.getItem("appConfig")) || defaultAppConfig;
    });

    // Load the data for the current lesson
    function loadLessonConfig() {
        selectionConfig = JSON.parse(localStorage.getItem(data.lessonConf.lesson_type + "Config",),) || collectAllLeafs(dataHead);
    }

    // Variables for handling the input and confirm button
    let answerInputField;
    let nextQuestionButton;

    // Loading the next question based on a random index
    function nextQuestion() {
        answerInputField.focus();
        currentAnswer = "";
        currentPathCategories = [];
        answerState = "unanswered";
        let index = Math.floor(Math.random() * Object.keys(lessonData).length); // Pick a random index from all available words in the lesson source file
        currentWord = lessonData[index]["word"]; // Load the word
        currentTranslation = lessonData[index]["translation"]; // Load the translation
        
        let randomSelectionPath = selectionConfig[Math.floor(Math.random() * selectionConfig.length,)];
        
        if (data.lessonConf.hasOwnProperty("sub_object")) {
            dataHead = lessonData[index]["inflection"][data.lessonConf.sub_object];
        } else {
            dataHead = lessonData[index]["inflection"];
        }

        let solutionEntry = String(getValueFromPath(dataHead, randomSelectionPath)); // Convert the entry to a string

        // Handle situations where multiple answers exist
        if (solutionEntry.indexOf(",") != -1) {
            currentSolution = String(solutionEntry).split(",");
        } else {
            currentSolution = [solutionEntry];
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
        e.preventDefault();
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

<h1 class="page-title">{data.lessonConf.lesson_name}</h1>

{debug}

{#if appConfig["showAccuracy"] == true}
    <AccuracyDisplay totalAnswerCount={totalAnswerCount} correctAnswerCount={correctAnswerCount} />
{/if}

<div class="saber-panel-default flashcard center-text">
    <h1 class="word">{currentWord}</h1>
    <p class="translation">{currentTranslation}</p>
    <div class="category-holder">
        {#each currentPathCategories as category_entry}
            {#if data.lessonLabels.hasOwnProperty(category_entry)}
                <p class="category-tag">{data.lessonLabels[category_entry]}</p>
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

{#if appConfig["showSkipButton"] == true}
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
