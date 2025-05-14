<script>
    export let options = []; // Array of strings
  
    export let selected = options[0] || "fi";
</script>

<select bind:value={selected}>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>

<style>
    select {
        padding: 10px;
        box-shadow: var(--box-shadow);
        border-radius: calc(var(--border-radius) - 4px);
        border: var(--border);
        background-color: var(--layer-2);
        color: var(--color);
    }
</style>