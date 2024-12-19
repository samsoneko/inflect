<script>
    let {children} = $props();
</script>

<nav class="navigation-bar panel-level-1">
    <select class="panel-level-2" name="practise-language-select" id="practise-language-select">
        <option value="fi">🇫🇮Finnish</option>
    </select>
	<a class="panel-level-2" href="/config">⚙</a>
</nav>

{@render children()}

<style>
:global(body) {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: rgb(0, 0, 0);
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
}

.navigation-bar {
    z-index: 1;
}

:global(.inflection-table) {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

:global(a) {
    color: lightskyblue;
}

:global(.panel-level-1) {
    background: rgba(62, 62, 62, 0.5);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.3px);
    -webkit-backdrop-filter: blur(7.3px);
    border: 1px solid rgb(74, 74, 74);
    border-radius: 10px;
    padding: 10px;
    width: max-content;
    text-align: center;
    margin: 20px auto;
}

:global(.panel-level-2) {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgb(74, 74, 74);
    background-color: rgb(48, 48, 48);
    color: white;
}
</style>