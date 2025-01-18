<script>
    import { fetchWikiTableData } from '../../async-utils.js';

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
        font-size: 0.9em;
        width: 100%;
        border-radius: var(--border-radius);
    }
</style>