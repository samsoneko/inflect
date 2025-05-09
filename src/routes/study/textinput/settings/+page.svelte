<script lang="ts">
    import { onMount, tick } from "svelte";
    import InflectionTree from "$lib/InflectionTree.svelte";
    import { collectAllPaths } from '$lib/utils/json-utils.ts';

    let { data } = $props();
    let lessonData = data.lessonData;
    let dataHead : object = $state(lessonData[0]["inflection"]);

    let currentSelection = $state(new Set<string>());
    let isViableConfiguration = $state(true);

    $effect(() => {
        isViableConfiguration = true;
        if (currentSelection.size < 1) {
            isViableConfiguration = false;
        }
    });

    onMount(() => {
        // Your function to execute on page load
        if (data.lessonConf.hasOwnProperty("sub_object")) {
            dataHead = lessonData[0]["inflection"][data.lessonConf.sub_object];
        } else {
            dataHead = lessonData[0]["inflection"];
        }
        buildMaps(dataHead);
        loadConfig();
    });

    let parentMap = new Map<string, string | undefined>();
    let childrenMap = new Map<string, string[]>();

    function buildMaps(node: object, path: string[] = [], parentPath?: string) {
        for (const [key, value] of Object.entries(node)) {
            const fullPath = [...path, key];
            const fullPathStr = fullPath.join('/');

            // Track parent
            parentMap.set(fullPathStr, parentPath);

            // Track children
            if (!childrenMap.has(parentPath ?? '')) {
                childrenMap.set(parentPath ?? '', []);
            }
            childrenMap.get(parentPath ?? '')!.push(fullPathStr);

            // Recurse if object (not array)
            if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0) {
                buildMaps(value, fullPath, fullPathStr);
            }
        }
    }

    function loadConfig() {
        let storedSelection = localStorage.getItem(data.lessonConf.lesson_type + "Config",);
        if (storedSelection) {
            try {
                const selectedLeaves: string[] = JSON.parse(storedSelection);
                currentSelection = new Set();

                // Select each leaf (auto-select parents too)
                for (const leaf of selectedLeaves) {
                    let current = leaf;
                    while (current !== undefined) {
                        currentSelection.add(current);
                        current = parentMap.get(current);
                    }
                }
                currentSelection = new Set(currentSelection);
            } catch (e) {
                console.error('Failed to load config:', e);
                selectAll();
            }
        }

        if(currentSelection.size == 0) {
            selectAll();
        }
    }

    function toggle(path: string, isChecked: boolean) {
        if (isChecked) {
            // Check this node
            currentSelection.add(path);

            // Check all ancestors
            let current = parentMap.get(path);
            while (current !== undefined) {
                currentSelection.add(current);
                current = parentMap.get(current);
            }

            // Also check all children (optional, but you said you'd like that)
            const toCheck = [path];
            while (toCheck.length > 0) {
                const current = toCheck.pop();
                if (current) {
                    currentSelection.add(current);
                    const children = childrenMap.get(current) || [];
                    toCheck.push(...children);
                }
            }

        } else {
            // Uncheck this node
            currentSelection.delete(path);

            // Uncheck all descendants
            const toUncheck = [path];
            while (toUncheck.length > 0) {
                const current = toUncheck.pop();
                if (current) {
                    currentSelection.delete(current);
                    const children = childrenMap.get(current) || [];
                    toUncheck.push(...children);
                }
            }

            // After unchecking → recursively check if parent(s) should be unchecked
            let current = parentMap.get(path);
            while (current !== undefined) {
                const siblings = childrenMap.get(current) || [];

                // If none of the siblings (including this node) are selected → uncheck parent
                const anySiblingSelected = siblings.some(child => currentSelection.has(child));

                if (!anySiblingSelected) {
                    currentSelection.delete(current);
                    current = parentMap.get(current);
                } else {
                    // Stop climbing — parent stays checked
                    break;
                }
            }
        }

        currentSelection = new Set(currentSelection);
    }

    function saveConfig() {
        const selectedLeaves = Array.from(currentSelection).filter(path => {
            const children = childrenMap.get(path);
            return !children || children.length === 0; // No children = leaf
        });

        localStorage.setItem(data.lessonConf.lesson_type + "Config", JSON.stringify(selectedLeaves),);
        window.location.href = "/";
    }

    function deselectAll() {
        currentSelection = new Set();
    }

    function selectAll() {
        const allPaths = collectAllPaths(dataHead);
        currentSelection = new Set(allPaths);
    }
</script>

<h1 class="page-title">
    {data.lessonConf.lesson_name} <i class="fas fa-cog"></i>
</h1>

<div class="saber-panel-default">
    Select as many entries for each category as you want to practise in the
    lesson. However, you have to select at least one entry per category to get a
    viable configuration.
</div>

{#each currentSelection as entry}
    {entry}
{/each}

<div class="saber-panel-default">
    <InflectionTree node={dataHead} {currentSelection} {toggle}/>
</div>

<div class="center-text bottom-buttons">
    {#if isViableConfiguration}
        <button class="saber-button-default saber-color-confirm" aria-label="Save" onclick={saveConfig}>
            <i class="fas fa-floppy-disk"></i> Save Config
        </button>
    {:else}
        Select at least one entry for each category.
    {/if}

    <button class="saber-button-default saber-color-error" aria-label="Deselect All" onclick={deselectAll}>
        <i class="fas fa-rotate-left"></i> Deselect All
    </button>
    <button class="saber-button-default saber-color-info" aria-label="Select All" onclick={selectAll}>
        <i class="fas fa-rotate-left"></i> Select All
    </button>
</div>

<style>
    .bottom-buttons {
        margin-top: 20px;
    }
</style>
