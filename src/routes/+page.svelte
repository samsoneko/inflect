<script>
    import CategoryBlock from "$lib/CategoryBlock.svelte";
    import { fetchWikiTableData } from '../async-utils.js';

    let query = '';
    let result = '';
    let errorMessage = '';

    function deleteResults() {
        result = "";
        query = "";
    }

    async function getWikiTable() {
        try {
            result = String(await fetchWikiTableData(query));
        }  
        catch (error) {
            errorMessage = `Error fetching data: ${error.message}`;
        }
    }

</script>

<h1 class="page-title">Hyvää Päivää!</h1>

<div class="page-section">
    <h2><i class="fas fa-magnifying-glass"></i> Search</h2>
    <div class="search-bar-wrapper">
        <form class="search-form" on:submit|preventDefault={getWikiTable}>
            <input class="default-element search-input" type="text" id="query" bind:value={query} placeholder="Enter search term" />
            <button class="default-element search-button" aria-label="Search" type="submit">
                <i class="fas fa-magnifying-glass"></i>
            </button>
        </form>
        {#if result}
            <button class="default-element clear-button" aria-label="Clear" on:click={() => deleteResults()}>
                <i class="fas fa-xmark"></i>
            </button>
        {/if}
    </div>

    <!-- Conditionally display the result or an error message -->
    {#if result}
        <h2>Search Results:</h2>
        <pre class="inflection-table">{@html result}</pre> <!-- Display JSON nicely formatted -->
    {:else if errorMessage}
        <p class="error">{errorMessage}</p>
    {/if}

</div>

<div class="page-section">
    <h2><i class="fas fa-book"></i> Study</h2>
    <div class="category-div">
        <CategoryBlock name={"Declination"} color={"var(--blue-color)"} href="study/textinput?lang=fi&lesson=decl" description={"Practise the declination of nouns and adjectives"}/>
        <CategoryBlock name={"Conjugation"} color={"var(--red-color)"} href="study/textinput?lang=fi&lesson=conj" description={"Practise the conjugation of verbs"}/>
        <CategoryBlock name={"Rections"} color={"var(--green-color)"} href="study/fi/rections" description={"Practise the rections for a variety of different verbs"}/>
        <CategoryBlock name={"Time"} color={"var(--purple-color)"} href="study/fi/time" description={"Practise different ways of expressing time"}/>
    </div>
</div>

<style>

    .search-bar-wrapper {
        width: 100%;
        display: flex;
    }

    .search-form {
        flex: 1;
        display: flex;
    }

    .search-input {
        border-radius: 15px;
        flex: 1;
    }

    .search-button {
        border-radius: 15px;
        margin-left: 6px;
    }

    .clear-button {
        border-radius: 15px;
        margin-left: 6px;
        background-color: var(--red-color);
    }

    .category-div {
        max-width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 10px;
    }

    .inflection-table {
        background-color: var(--layer-1);
        border-collapse: collapse;
        font-family: "Open Sans", sans-serif;
        font-size: 0.9em;
        width: 100%;
        border-radius: var(--border-radius);
    }
</style>