<script>
    export let options = {"placeholder": {"name": "placeholder"}}; // Array of strings
  
    export let selected = Object.keys(options)[0] || "fi";
</script>

<select bind:value={selected}>
    {#each Object.keys(options) as option}
        <option value={option}>{options[option].name}</option>
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
        margin-top: -6px;
    }
</style>