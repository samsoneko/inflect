<script>
    import { onMount, tick } from "svelte";
    import nouns from "$lib/study/fi/nouns.json";
    import verbs from "$lib/study/fi/verbs.json";
    import lesson_conf from "$lib/textinput/lesson_conf.json";
    import AccuracyDisplay from "$lib/AccuracyDisplay.svelte";
    import { page } from "$app/stores";

    let languageParam = $state("");
    let lessonParam = $state("");

    let lesson_data = nouns;
    let current_lesson_conf = $state(lesson_conf["decl"]);

    // Variables holding information about the current question
    let current_word = $state("");
    let current_translation = $state("");

    let current_categories = $state([]);
    let current_category_desc = $state([]);

    let current_solution = $state([]);

    // Variables holding information about the current answer
    let current_answer = $state("");
    let answer_state = $state("unanswered");

    let total_answer_count = $state(0);
    let correct_answer_count = $state(0);

    // On page load, initialize data and load first question
    onMount(() => {
        loadLessonData();
        nextQuestion();
    });

    // Load the data for the current lesson based on the url parameters
    async function loadLessonData() {
        const searchParams = $page.url.searchParams;
        if (languageParam == "" && lessonParam == "") {
            languageParam = searchParams.get("lang");
            lessonParam = searchParams.get("lesson");
        }

        if (lessonParam == "decl" && languageParam == "fi") {
            lesson_data = nouns;
            current_lesson_conf = lesson_conf[lessonParam];
            current_lesson_conf.category_data =
                JSON.parse(
                    localStorage.getItem(
                        current_lesson_conf.lesson_type + "Config",
                    ),
                ) || lesson_conf[lessonParam].category_data;
        } else if (lessonParam == "conj" && languageParam == "fi") {
            lesson_data = verbs;
            current_lesson_conf = lesson_conf[lessonParam];
            current_lesson_conf.category_data =
                JSON.parse(
                    localStorage.getItem(
                        current_lesson_conf.lesson_type + "Config",
                    ),
                ) || lesson_conf[lessonParam].category_data;
        } else {
            window.location.href = "/";
        }
    }

    // Variables for handling the input and confirm button
    let answerInputField;
    let nextQuestionButton;

    // Loading the next question based on a random index
    function nextQuestion() {
        answerInputField.focus();
        current_answer = "";
        answer_state = "unanswered";
        let index = Math.floor(Math.random() * Object.keys(lesson_data).length);
        current_word = lesson_data[index]["word"];
        current_translation = lesson_data[index]["translation"];
        current_categories = [];
        current_category_desc = [];

        for (let i = 0; i < current_lesson_conf.categories.length; i++) {
            let category_index = Math.floor(Math.random() * current_lesson_conf.category_data[i].length,);
            current_categories.push(current_lesson_conf.category_data[i][category_index],);
            current_category_desc.push(current_lesson_conf.category_desc[current_lesson_conf.category_data[i][category_index]],);
        }

        let solution_entry = lesson_data[index][current_lesson_conf.lesson_type];
        for (let i = 0; i < current_categories.length; i++) {
            solution_entry = solution_entry[current_categories[i]];
        }
        solution_entry = String(solution_entry);

        if (solution_entry.indexOf(",") != -1) {
            current_solution = String(solution_entry).split(",");
        } else {
            current_solution = [solution_entry];
        }
    }

    // Check if the answer is correct
    function checkAnswer() {
        if (current_solution.includes(current_answer)) {
            answer_state = "correct";
            total_answer_count += 1;
            correct_answer_count += 1;
            tick();
            nextQuestionButton.focus();
        } else {
            answer_state = "wrong";
            answerInputField.focus();
            total_answer_count += 1;
        }
    }
</script>

<div class="center-text">
    <h1 class="page-title">Noun Declination</h1>
</div>

<AccuracyDisplay {total_answer_count} {correct_answer_count} />

<div class="page-section-panel flashcard center-text">
    <h1 class="word">{current_word}</h1>
    <p class="translation">{current_translation}</p>
    {#each current_category_desc as category_entry}
        <p>{category_entry}</p>
    {/each}
    <form onsubmit={checkAnswer}>
        <input
            class="default-element answer-input"
            type="text"
            bind:this={answerInputField}
            id="query"
            bind:value={current_answer}
            placeholder="Enter your answer"
        />
        <button
            class="default-element check-button"
            aria-label="Search"
            type="submit"
        >
            <i class="fas fa-check"></i>
        </button>
    </form>
</div>

{#if answer_state == "correct"}
    <div class="page-section-panel correct-answer-div center-text">
        <h2>Correct!</h2>
        {#if current_solution.length > 1}
            <p>All variants of this word are:</p>
            <h3>{current_solution}</h3>
        {/if}
        <button class="default-element next-card-button" aria-label="Search" bind:this={nextQuestionButton} onclick={() => nextQuestion()} autofocus>
            <i class="fas fa-arrow-right"></i>
        </button>
    </div>
{:else if answer_state == "wrong"}
    <div class="page-section-panel wrong-answer-div center-text">
        <h2>Wrong!</h2>
        <p>The right answer would have been:</p>
        <h3>{current_solution}</h3>
    </div>
{/if}
<div class="center-text">
    <button class="default-element next-card-button" aria-label="Search" onclick={() => nextQuestion()}>
        Skip Question
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
        color: grey;
        margin-top: 0px;
        margin-bottom: 30px;
    }

    .check-button {
        background-color: var(--green-color);
    }

    .correct-answer-div {
        border: 8px solid var(--green-color);
    }

    .wrong-answer-div {
        border: 8px solid var(--red-color);
    }

    .next-card-button {
        background-color: var(--green-color);
    }

    .answer-input {
        border-radius: 15px;
        flex: 1;
        background-color: var(--layer-0);
    }
</style>
