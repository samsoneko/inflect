<script>
    import { fetchWikiTableData } from '../async-utils.js';

    let query = '';
    let result = '';
    let errorMessage = '';

    function deleteResults() {
        result = "";
        query = "";
        errorMessage = "";
    }

    async function getWikiTable() {
        try {
            if (query != "") {
                result = String(await fetchWikiTableData(query));
            }
        }  
        catch (error) {
            errorMessage = `Error fetching data: ${error.message}`;
        }
    }
</script>

<div class="search-bar-wrapper">
    <form class="search-form" on:submit|preventDefault={getWikiTable}>
        <input class="saber-input-default search-input" type="text" id="query" bind:value={query} placeholder="Enter search term" />
        <button class="saber-button-default search-button" aria-label="Search" type="submit">
            <i class="fas fa-magnifying-glass"></i>
        </button>
    </form>
    {#if result || errorMessage}
        <button class="saber-button-default clear-button" aria-label="Clear" on:click={() => deleteResults()}>
            <i class="fas fa-xmark"></i>
        </button>
    {/if}
</div>

<!-- Conditionally display the result or an error message -->
{#if result}
    <h2>Search Results:</h2>
    <pre class="inflection-table">{@html result}</pre> <!-- Display JSON nicely formatted -->
{:else if errorMessage}
    <div class="saber-panel-default saber-border-error center-text wiktionary-error-panel disclaimer">
        It seems like the word you searched for was not a noun.
        <!-- <p class="error">{errorMessage}</p> -->
    </div>
{/if}

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

    .inflection-table {
        background-color: var(--layer-1);
        border-collapse: collapse;
        font-family: "Open Sans", sans-serif;
        font-size: 0.8em;
        width: 100%;
        border-radius: var(--border-radius);
        border: var(--border);
    }

    .wiktionary-error-panel {
        margin-top: 16px;
    }
</style>