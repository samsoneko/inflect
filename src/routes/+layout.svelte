<script>
    let {children} = $props();
</script>

<nav class="navigation-bar panel">
	<a href="/">Translator</a>
	<a href="/cards">Flashcards</a>
	<a href="/config">Configuration</a>
</nav>

{@render children()}

<style>
:global(body) {
    background-color: rgb(20, 19, 48);
    background-image: url('$lib/images/background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

:global(.panel) {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.3px);
    -webkit-backdrop-filter: blur(7.3px);
    border: 1px solid rgba(255, 255, 255, 1);
}

.navigation-bar {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: center;
    max-width: 800px;
    width: max-content;
    margin: 40px auto auto auto;
    border: 1px solid grey;
    border-radius: 20px;
    padding: 20px;
}

:global(.main-panel) {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: center;
    max-width: 800px;
    width: max-content;
    margin: 40px auto auto auto;
    border: 1px solid grey;
    border-radius: 20px;
    padding: 20px;
}

:global(.inflection-table) {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
</style>