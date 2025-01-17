<script>
    import { onMount, tick } from 'svelte';
    import nouns from '$lib/study/fi/nouns.json';
    import verbs from '$lib/study/fi/verbs.json';
    import AccuracyDisplay from '$lib/AccuracyDisplay.svelte';
    import { page } from '$app/stores';

    let language = $state();
    let lesson = $state();

    let data = nouns;
    let data_name = $state();
    let categories = $state();
    let category_data = $state();
    let category_desc = $state();

    $effect(() => {
        const searchParams = $page.url.searchParams;
        language = searchParams.get('lang');
        lesson = searchParams.get('lesson');

        if (lesson == "decl" && language == "fi") {

            data = nouns;
            data_name = "declination";
            categories = ["cases", "classes"]
            category_data = [["nominative", "partitive", "genitive", "illative", "inessive", "elative", "allative", "adessive", "ablative"],
            ["singular", "plural"]]

            category_desc = [["nominative", "partitive", "genitive", "illative (-hVn, -Vh, seen)", "inessive (-ssa, -ssä)", "elative (-sta, -stä)", "allative (-lle)", "adessive (-lla, -llä)", "ablative (-lta, -ltä)"],
            ["singular", "plural"]]
        }
        else if (lesson == "conj" && language == "fi") {

            data = verbs;
            data_name = "conjugation";
            categories = ["tense", "person", "polarity"]
            category_data = [["present", "imperfect", "perfect", "pluperfect"],
            ["1st sing.", "2nd sing.", "3rd sing.", "1st plur.", "2nd plur.", "3rd plur."],
            ["positive", "negative"]]

            category_desc = [["present", "imperfect", "perfect", "pluperfect"],
            ["1. person singular", "2. person singular", "3. person singular", "1. person plural", "1. person plural", "1. person plural"],
            ["positive", "negative"]]
        }
        else {
            window.location.href = '/';
        }
    });

    let current_word = $state("");
    let current_translation = $state("");

    let current_categories = $state([]);
    let current_category_desc = $state([]);

    let current_solution = $state([]);
    

    let answer = $state("");
    let answer_state = $state("unanswered");

    let total_answer_count = $state(0);
    let correct_answer_count = $state(0);
  
    onMount(() => {
      // Your function to execute on page load
      console.log("Page has loaded!");
      nextCard();
      total_answer_count = 0;
      correct_answer_count = 0;
    });

    let index = $state(0)

    let inputField;
    let loadNextButton;

    let alternatives = $state(false);

    function nextCard() {
      inputField.focus();
      answer = "";
      answer_state = "unanswered";
      index = Math.floor(Math.random() * Object.keys(data).length);
      current_word = data[index]["word"];
      current_translation = data[index]["translation"];
      current_categories = [];
      current_category_desc = [];
      
      for (let i = 0; i < categories.length; i++) {
        let category_index = Math.floor(Math.random() * category_data[i].length);
        current_categories.push(category_data[i][category_index]);
        current_category_desc.push(category_desc[i][category_index]);
      }

      let solution_entry = data[index][data_name];
      for (let i = 0; i < current_categories.length; i++) {
        solution_entry = solution_entry[current_categories[i]];
      }
      solution_entry = String(solution_entry);
      
      if (solution_entry.indexOf(',') != -1) {
        current_solution = String(solution_entry).split(',');
        alternatives = true;
      } else {
        current_solution = [solution_entry];
        alternatives = false;
      }
    }

    function checkSolution() {
      if (current_solution.includes(answer)) {
        answer_state = "correct";
        total_answer_count += 1;
        correct_answer_count += 1;
        tick();
        loadNextButton.focus();
      }
      else {
        answer_state = "wrong";
        inputField.focus();
        total_answer_count += 1;
      }
    }

</script>

<div class="center-text">
  <h1 class="page-title">Noun Declination</h1>
</div>

<AccuracyDisplay total_answer_count={total_answer_count} correct_answer_count={correct_answer_count}/>

<div class="page-section-panel flashcard center-text">
  <h1 class="word">{current_word}</h1>
  <p class="translation">{current_translation}</p>
  {#each current_category_desc as category_entry}
    <p>{category_entry}</p>
  {/each}
  <form onsubmit={checkSolution}>
    <input class="default-element answer-input" type="text" bind:this={inputField} id="query" bind:value={answer} placeholder="Enter your answer"/>
    <button class="default-element check-button" aria-label="Search" type="submit">
      <i class="fas fa-check"></i>
    </button>
  </form>
</div>

{#if answer_state == "correct"}
  <div class="page-section-panel correct-answer-div center-text">
    <h2>Correct!</h2>
    {#if alternatives == true}
      <p>All variants of this word are:</p>
      <h3>{current_solution}</h3>
    {/if}
    <button class="default-element next-card-button" aria-label="Search" bind:this={loadNextButton} onclick={() => nextCard()} autofocus>
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