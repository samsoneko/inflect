<script>
    let lightMode = false;
  
    // Load the saved theme from localStorage
    if (typeof window !== 'undefined') {
        lightMode = localStorage.getItem('theme') === 'light';
        document.body.classList.toggle('light-theme', lightMode);
    }
  
    function toggleTheme() {
        lightMode = !lightMode;
        document.body.classList.toggle('dark-theme', lightMode);
        localStorage.setItem('theme', lightMode ? 'light' : 'dark');
    }
</script>
  
<button on:click={toggleTheme}>
    {lightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
</button>