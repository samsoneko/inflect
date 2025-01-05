<script>
    let {children} = $props();
</script>

<div class="app-frame">
    <nav class="navigation-bar panel-level-1">
        <a class="panel-level-2" href="/">🏠</a>
        <select class="panel-level-2" name="practise-language-select" id="practise-language-select">
            <option value="fi">🇫🇮Finnish</option>
        </select>
        <a class="panel-level-2" href="/settings">⛭</a>
    </nav>
    <slot />
</div>

<style>

:global(body) {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: rgb(0, 0, 0);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.app-frame {
    width: 500px;
    min-height: 800px;
    /* height: 800px; */
    border-radius: 10px; /* rounded corners for a modern mobile look */
    background: rgba(62, 62, 62, 0.5);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #7c7c7c; /* optional border for emphasis */
    box-shadow: 1px 1px 16px rgba(73, 73, 73, 0.6);
    overflow-y: auto
}
.app-frame::-webkit-scrollbar {
  display: none;
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
    background: rgba(62, 62, 62, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.3px);
    -webkit-backdrop-filter: blur(7.3px);
    border: 1px solid rgb(74, 74, 74);
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    margin: 10px 10px 0px 10px;
}

:global(.panel-level-2) {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgb(74, 74, 74);
    background-color: rgb(48, 48, 48);
    color: white;
}
</style>