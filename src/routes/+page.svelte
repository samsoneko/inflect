<script>
    import CategoryBlock from "$lib/CategoryBlock.svelte";

    let query = '';
    let result = null;
    let errorMessage = '';

    async function fetchData() {
        try {
        if (query == "") {
            return
        }
        // Define the API endpoint and append the form query as a parameter
        const apiUrl = "https://en.wiktionary.org/w/api.php?";

        let params = {
            action : "parse",
            prop : "wikitext",
            page : query.toLowerCase(),
            format : "json",
            origin : "*"
        };

        let queryString = apiUrl + new URLSearchParams(params).toString();
        // Send GET request using fetch
        const response = await fetch(queryString);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response as JSON
        let jsonResponse = await response.json();
        let wikitext = jsonResponse.parse.wikitext["*"];
        let lines = wikitext.split(/\r?\n|\r|\n/g);

        let command = '';

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes("fi-decl")) {
                command = lines[i];
            }
        }

        const apiUrl2 = "https://en.wiktionary.org/w/api.php?";

        let params2 = {
            action : "parse",
            text : command,
            prop : "text",
            format : "json",
            origin : "*"
        };

        let queryString2 = apiUrl2 + new URLSearchParams(params2).toString();
        // Send GET request using fetch
        const response2 = await fetch(queryString2);

        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response as JSON
        let jsonResponse2 = await response2.json();
        let inflectionTable = jsonResponse2.parse.text["*"];

        let temp = document.createElement('div');
        temp.innerHTML = inflectionTable;

        let table = temp.getElementsByClassName('inflection-table')[0];

        result = table.outerHTML;

        errorMessage = ''; // Clear any previous error message
        }
        catch (error) {
            errorMessage = `Error fetching data: ${error.message}`;
            // result = null; // Clear result on error
        }
    }

    function deleteResults() {
        result = "";
        query = "";
    }

</script>

<h1 class="title">Hyvää Päivää!</h1>

<div class="search-panel">
    <h2><i class="fas fa-magnifying-glass"></i> Search</h2>
    <div class="search-wrapper">
        <form class="search-form" on:submit|preventDefault={fetchData}>
            <input class="layer-1-element search-input" type="text" id="query" bind:value={query} placeholder="Enter search term" />
            <button class="layer-1-element search-button" aria-label="Search" type="submit">
                <i class="fas fa-magnifying-glass"></i>
            </button>
        </form>
        {#if result}
            <button class="layer-1-element clear-button warn-color" aria-label="Clear" on:click={() => deleteResults()}>
                <i class="fas fa-xmark"></i>
            </button>
        {/if}
    </div>

    <!-- Conditionally display the result or an error message -->
    {#if result}
        <h2>Search Results:</h2>
        <pre>{@html result}</pre> <!-- Display JSON nicely formatted -->
    {:else if errorMessage}
        <p class="error">{errorMessage}</p>
    {/if}

</div>

<div class="learn-panel">
    <h2><i class="fas fa-book"></i> Learn</h2>
    <div class="category-div">
        <CategoryBlock name={"Declination"} color={"#fdde67"} href="learn/fi/declination" description={"Practise the declination of nouns and adjectives"}/>
        <CategoryBlock name={"Conjugation"} color={"#ff9b61"} href="learn/fi/conjugation" description={"Practise the conjugation of verbs"}/>
        <CategoryBlock name={"Rections"} color={"#b6f36b"} href="learn/fi/rections" description={"Practise the rections for a variety of different verbs"}/>
        <CategoryBlock name={"Time"} color={"#c8a0ff"} href="learn/fi/time" description={"Practise different ways of expressing time"}/>
        <!-- <CategoryBlock name={"Placeholder"} color={"#95dbfa"} href="learn/fi/time"/> -->
    </div>
</div>