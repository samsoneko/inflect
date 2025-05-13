<script>
    import { createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';
  
    export let options = []; // Array of strings
    export let defaultOption = '';
  
    export let selected = writable(defaultOption || options[0]);
  
    const dispatch = createEventDispatcher();
  
    function handleChange(event) {
        selected.set(event.target.value);
        dispatch('change', { value: event.target.value });
    }
</script>

<select on:change={handleChange}>
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