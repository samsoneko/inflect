<script>
    import CategoryBlock from "$lib/CategoryBlock.svelte";

    let query = '';
    let result = null;
    let errorMessage = '';

    async function fetchData() {
        try {
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

</script>

<div class="panel-level-1">
    <!-- HTML Form to take input from the user -->
    <form on:submit|preventDefault={fetchData}>
        <label for="query">Search Query:</label>
        <input class="panel-level-2" type="text" id="query" bind:value={query} placeholder="Enter search term" />
        <button class="panel-level-2" type="submit">Search</button>
    </form>

    <!-- Conditionally display the result or an error message -->
    {#if result}
        <h2>Search Results:</h2>
        <pre>{@html result}</pre> <!-- Display JSON nicely formatted -->
    {:else if errorMessage}
        <p class="error">{errorMessage}</p>
    {/if}

</div>

<div class="panel-level-1">
    <h1>Learn</h1>
    <CategoryBlock name={"Flection"} color={"#42b883"} href="learn/fi/flection"/>
    <CategoryBlock name={"Rections"} color={"#347474"} href="learn/fi/rections"/>
    <CategoryBlock name={"Time"} color={"#35495e"} href="learn/fi/time"/>
</div>