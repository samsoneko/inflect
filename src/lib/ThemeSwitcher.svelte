<script>
    import { onMount } from "svelte";

    let currentTheme = $state();

    onMount(() => {
        updateCurrentTheme()
        setTheme(currentTheme);
    });

    function updateCurrentTheme() {
        let placeholder = localStorage.getItem('theme');
        currentTheme = placeholder != null ? placeholder : "dark";
    }
  
    function setTheme(theme) {
        if (theme == "black") {
            document.body.classList.add('black-theme');
            document.body.classList.remove('light-theme');
            document.body.classList.remove('jungle-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "dark") {
            document.body.classList.remove('light-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('jungle-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "light") {
            document.body.classList.add('light-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('jungle-theme');
            localStorage.setItem('theme', theme);
        } else if (theme == "jungle") {
            document.body.classList.add('jungle-theme');
            document.body.classList.remove('black-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', theme);
        }
        updateCurrentTheme();
    }
</script>


<h3>🎨Theme</h3>

<form class="theme-selector">
    <input type="radio" id="black" name="theme" value="black" checked={currentTheme=="black"} onclick={() => setTheme("black")}/>
    <label for="black">Black</label>

    <input type="radio" id="dark" name="theme" value="dark" checked={currentTheme=="dark"} onclick={() => setTheme("dark")}/>
    <label for="dark">Dark</label>

    <input type="radio" id="light" name="theme" value="light" checked={currentTheme=="light"} onclick={() => setTheme("light")}/>
    <label for="light">Light</label>

    <input type="radio" id="jungle" name="theme" value="jungle" checked={currentTheme=="jungle"} onclick={() => setTheme("jungle")}/>
    <label for="jungle">Jungle</label>
</form>

<hr>

<style>
    .theme-selector {
    }
</style>