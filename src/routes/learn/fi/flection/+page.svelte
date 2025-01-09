<script>
    import { onMount } from 'svelte';
    import adjectives from '$lib/learn/fi/adjectives.json';

    let cases = ["nominative", "partitive", "genitive", "illative", "inessive", "elative", "allative", "adessive", "ablative"]
    let case_descriptions = ["nominative", "partitive", "genitive", "illative (-hVn, -Vh, seen)", "inessive (-ssa, -ssä)", "elative (-sta, -stä)", "allative (-lle)", "adessive (-lla, -llä)", "ablative (-lta, -ltä)"]
    let classes = ["singular", "plural"]

    let current_word = $state("");
    let current_case = $state("");
    let current_case_description = $state("");
    let current_class = $state("");
    let current_solution = $state("");
    
    let answer = $state("");
    let correct_answer = $state("unanswered");
  
    onMount(() => {
      // Your function to execute on page load
      console.log("Page has loaded!");
      nextCard();
    });

    let index = $state(0)

    function nextCard() {
      correct_answer = "unanswered";
      index = Math.floor(Math.random() * 50);
      current_word = adjectives[index]["word"];

      let case_index = Math.floor(Math.random() * cases.length)
      current_case = cases[case_index];
      current_case_description = case_descriptions[case_index];
      current_class = classes[Math.floor(Math.random() * classes.length)];
      current_solution = adjectives[index]["declination"][current_case][current_class];
    }

    function checkSolution() {
      if (answer == current_solution) {
        correct_answer = "correct";
      } else {
        correct_answer = "wrong";
      }
    }
</script>

<div class="center-text">
  <h1>Flection</h1>
</div>

<div class="layer-1-element flashcard center-text">
  <h1>{current_word}</h1>
  <p>{current_class}</p>
  <p>{current_case_description}</p>
  <form onsubmit={checkSolution}>
    <input class="layer-1-element search-bar" type="text" id="query" bind:value={answer} placeholder="Enter your answer" />
    <button class="layer-1-element check-button" aria-label="Search" type="submit">
      <i class="fas fa-check"></i>
    </button>
  </form>
</div>

{#if correct_answer == "correct"}
  <div class="layer-1-element correct-answer-div center-text">
    <h2>Correct!</h2>
    <button class="layer-1-element next-card-button" aria-label="Search" onclick={() => nextCard()}>
      <i class="fas fa-arrow-right"></i>
    </button>
  </div>
{:else if correct_answer == "wrong"}
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

  .check-button {
    border-radius: var(--border-radius);
    background-color: darkolivegreen;
  }

  .correct-answer-div {
    border-radius: var(--border-radius);
    margin-top: 40px;
    background-color: darkolivegreen;
  }

  .wrong-answer-div {
    border-radius: var(--border-radius);
    margin-top: 40px;
    background-color: rgb(73, 4, 4);
  }

  .next-card-button {
    border-radius: var(--border-radius);
    background-color: darkgreen;
  }
</style>