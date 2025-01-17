<script>
    import { onMount, tick } from 'svelte';
    import nouns from '$lib/study/fi/nouns.json';
    import AccuracyDisplay from '$lib/AccuracyDisplay.svelte';

    let cases = ["nominative", "partitive", "genitive", "illative", "inessive", "elative", "allative", "adessive", "ablative"]
    let case_descriptions = ["nominative", "partitive", "genitive", "illative (-hVn, -Vh, seen)", "inessive (-ssa, -ssä)", "elative (-sta, -stä)", "allative (-lle)", "adessive (-lla, -llä)", "ablative (-lta, -ltä)"]
    let classes = ["singular", "plural"]

    let current_word = $state("");
    let current_translation = $state("");
    let current_case = $state("");
    let current_case_description = $state("");
    let current_class = $state("");
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
      index = Math.floor(Math.random() * Object.keys(nouns).length);
      current_word = nouns[index]["word"];
      current_translation = nouns[index]["translation"];

      let case_index = Math.floor(Math.random() * cases.length)
      current_case = cases[case_index];
      current_case_description = case_descriptions[case_index];
      current_class = classes[Math.floor(Math.random() * classes.length)];

      let solution_entry = String(nouns[index]["declination"][current_case][current_class]);
      
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
  <h1 class="title">Noun Declination</h1>
</div>

<AccuracyDisplay total_answer_count={total_answer_count} correct_answer_count={correct_answer_count}/>

<div class="layer-1-element flashcard center-text">
  <h1 class="word">{current_word}</h1>
  <p class="translation">{current_translation}</p>
  <p>{current_class}</p>
  <p>{current_case_description}</p>
  <form onsubmit={checkSolution}>
    <input class="layer-1-element answer-input" type="text" bind:this={inputField} id="query" bind:value={answer} placeholder="Enter your answer"/>
    <button class="layer-1-element check-button" aria-label="Search" type="submit">
      <i class="fas fa-check"></i>
    </button>
  </form>
</div>

{#if answer_state == "correct"}
  <div class="layer-1-element correct-answer-div center-text">
    <h2>Correct!</h2>
    {#if alternatives == true}
      <p>All variants of this word are:</p>
      <h3>{current_solution}</h3>
    {/if}
    <button class="layer-1-element next-card-button" aria-label="Search" bind:this={loadNextButton} onclick={() => nextCard()} autofocus>
      <i class="fas fa-arrow-right"></i>
    </button>
  </div>
{:else if answer_state == "wrong"}
  <div class="layer-1-element wrong-answer-div center-text">
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
    border-radius: var(--border-radius);
    background-color: darkolivegreen;
  }

  .correct-answer-div {
    border: 8px solid darkolivegreen;
    border-radius: var(--border-radius);
    margin-top: 16px;
  }

  .wrong-answer-div {
    border: 8px solid rgb(73, 4, 4);
    border-radius: var(--border-radius);
    margin-top: 16px;
  }

  .next-card-button {
    border-radius: var(--border-radius);
    background-color: darkolivegreen;
  }
</style>