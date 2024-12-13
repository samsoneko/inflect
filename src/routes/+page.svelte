<script>
    import {getWikiEntry} from "../wiktionary_handler.js";
    let name = "default";
    let input = "Kissa";

</script>

<form onsubmit={() => name = getWikiEntry(input)}>
    <input bind:value={input}>
    <button type="submit">Look up</button>
</form>

<p>this is {name}</p>