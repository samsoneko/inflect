<script>
    import { onMount, tick } from "svelte";
    import AccuracyDisplay from "$lib/AccuracyDisplay.svelte";

    let { data } = $props();

    let lessonData = data.lesson;
    let currentLessonConfig = $state(data.conf);

    // Variables holding information about the current question
    let currentWord = $state("");
    let currentTranslation = $state("");

    let currentCategories = $state([]);
    let currentCategoryDescs = $state([]);

    let currentSolution = $state([]);

    // Variables holding information about the current answer
    let currentAnswer = $state("");
    let answerState = $state("unanswered");

    let totalAnswerCount = $state(0);
    let correctAnswerCount = $state(0);

    // On page load, initialize data and load first question
    onMount(() => {
        loadLessonConfig();
        nextQuestion();
    });

    // Load the data for the current lesson based on the url parameters
    function loadLessonConfig() {
        currentLessonConfig.category_data = JSON.parse(localStorage.getItem(currentLessonConfig.lesson_type + "Config",),) || currentLessonConfig.category_data;
    }

    // Variables for handling the input and confirm button
    let answerInputField;
    let nextQuestionButton;

    // Loading the next question based on a random index
    function nextQuestion() {
        answerInputField.focus();
        currentAnswer = "";
        answerState = "unanswered";
        let index = Math.floor(Math.random() * Object.keys(lessonData).length);
        currentWord = lessonData[index]["word"];
        currentTranslation = lessonData[index]["translation"];
        currentCategories = [];
        currentCategoryDescs = [];

        for (let i = 0; i < currentLessonConfig.categories.length; i++) {
            let category_index = Math.floor(Math.random() * currentLessonConfig.category_data[i].length,);
            currentCategories.push(currentLessonConfig.category_data[i][category_index],);
            currentCategoryDescs.push(currentLessonConfig.category_desc[currentLessonConfig.category_data[i][category_index]],);
        }

        let solutionEntry = lessonData[index]["data"];
        for (let i = 0; i < currentCategories.length; i++) {
            solutionEntry = solutionEntry[currentCategories[i]];
        }
        solutionEntry = String(solutionEntry);

        if (solutionEntry.indexOf(",") != -1) {
            currentSolution = String(solutionEntry).split(",");
        } else {
            currentSolution = [solutionEntry];
        }
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

<div class="center-text">
    <h1 class="page-title">Noun Declination</h1>
</div>

<AccuracyDisplay totalAnswerCount={totalAnswerCount} correctAnswerCount={correctAnswerCount} />

<div class="saber-panel-default flashcard center-text">
    <h1 class="word">{currentWord}</h1>
    <p class="translation">{currentTranslation}</p>
    {#each currentCategoryDescs as category_entry}
        <p>{category_entry}</p>
    {/each}
    <form autocomplete="off" onsubmit={checkAnswer}>
        <input
            class="saber-input-default answer-input"
            type="text"
            bind:this={answerInputField}
            id="query"
            bind:value={currentAnswer}
            placeholder="Enter your answer"
        />
        <button
            class="saber-button-default saber-color-confirm"
            aria-label="Search"
            type="submit"
        >
            Check
            <i class="fas fa-check"></i>
        </button>
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
<div class="center-text">
    <button class="saber-button-default saber-color-warn" aria-label="Search" onclick={() => nextQuestion()}>
        Skip Question
        <i class="fas fa-forward"></i>
    </button>
</div>


<style>
    .flashcard {
        border-radius: var(--border-radius);
    }

    .word {
        margin-bottom: 0px;
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
