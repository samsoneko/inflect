<script lang="ts">
    import InflectionTree from "$lib/InflectionTree.svelte";

    export let node: object;
    export let path: string[] = []; // for unique keys and labeling

    export let currentSelection: Set<string>; // set of checked paths
    export let toggle: (path: string, checked: boolean) => void; // function to toggle selection
</script>
  
<ul>
    {#each Object.entries(node) as [key, value]}
        <li>
            <label>
                <input type="checkbox" checked={currentSelection.has(path.concat(key).join('.'))} on:change={(e) => toggle(path.concat(key).join('.'), (e.target as HTMLInputElement).checked)} />
                {key}
            </label>
    
            {#if typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0}
                <!-- Recursive call if children exist -->
                <InflectionTree node={value} path={path.concat(key)} {currentSelection} {toggle} />
            {/if}
        </li>
    {/each}
</ul>