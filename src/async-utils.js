export async function fetchWikiTableData(searchQuery) {
    if (searchQuery == "") {
        return
    }
    // Define the API endpoint and append the form query as a parameter
    const apiUrl = "https://en.wiktionary.org/w/api.php?";

    let articleParams = {
        action : "parse",
        prop : "wikitext",
        page : searchQuery.toLowerCase(),
        format : "json",
        origin : "*"
    };

    let articleQueryString = apiUrl + new URLSearchParams(articleParams).toString();
    // Send GET request using fetch
    const response = await fetch(articleQueryString);
    
    // Check if the request was successful
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    // Parse the response as JSON
    let articleJsonResponse = await response.json();
    let wikitext = articleJsonResponse.parse.wikitext["*"];
    let lines = wikitext.split(/\r?\n|\r|\n/g);

    let command = '';

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("fi-decl")) {
            command = lines[i];
        }
    }

    let tableParams = {
        action : "parse",
        text : command,
        prop : "text",
        format : "json",
        origin : "*"
    };

    let tableQueryString = apiUrl + new URLSearchParams(tableParams).toString();
    // Send GET request using fetch
    const response2 = await fetch(tableQueryString);

    if (!response2.ok) {
        throw new Error('Network response was not ok');
    }

    // Parse the response as JSON
    let tableJsonResponse = await response2.json();
    let inflectionTable = tableJsonResponse.parse.text["*"];

    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = inflectionTable;

    let preTable = tempDiv.getElementsByClassName('inflection-table')[0];

    let table = preTable.outerHTML;

    return table;
}