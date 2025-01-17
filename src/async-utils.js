export async function fetchWikiTableData(query) {
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

    let result = table.outerHTML;

    return result;
}