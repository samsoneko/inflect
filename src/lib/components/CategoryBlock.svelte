<script>
	let {
        name = "Category",
        color = "green",
        lesson_path = "/",
        settings_path = "/",
        description = "Description",
		tags = [] // e.g., ["verbs", "present-tense", "A1"]
    } = $props();
</script>

<div class="category-panel" style="--category-color:{color}">
	<div class="category-content">
		<p class="category-title">{name}</p>
		<p class="category-description">{description}</p>
        {#if tags.length > 0}
            <div class="category-tag-wrapper">
                {#each tags as tag}
                    <span class="category-tag">#{tag}</span>
                {/each}
            </div>
        {/if}
	</div>
	<div class="category-button-wrapper">
		<a class="category-button study-button" href={lesson_path} aria-label="Study">Study<i class="fas fa-play"></i></a>
		<a class="category-button" href={settings_path} aria-label="Settings"><i class="fas fa-gear"></i></a>
		<a class="category-button" href="#" aria-label="Statistics"><i class="fas fa-chart-bar"></i></a>
	</div>
</div>

<style>
    .category-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        min-height: auto;
        background-color: var(--category-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        padding: 12px 16px;
    }

    .category-panel:hover {
        transform: scale(1.02);
    }

    .category-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        overflow: hidden;
        padding-right: 12px;
    }

    .category-title {
        margin: 0;
        font-size: 1.2em;
        font-weight: bold;
        color: var(--contrast-text-color);
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .category-description {
        margin: 4px 0 0 0;
        font-size: 0.8em;
        color: var(--contrast-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .category-button-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr; /* two equal columns */
        grid-template-rows: auto auto;  /* two rows sized automatically */
        gap: 4px;
        max-width: 400px;
    }

    .category-button {
        padding: 7px;
        font-size: 1em;
        text-align: center;
        cursor: pointer;
        color: white;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 12px;
    }

    .study-button {
        grid-column: 1 / span 2;
    }

    .category-button:hover {
        transform: scale(1.05);
    }

    .category-tag-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 6px;
        border-top: 1px solid rgba(0,0,0,0.1);
        padding-top: 6px;
    }

    .category-tag {
        background-color: rgba(0, 0, 0, 0.1);
        color: var(--contrast-text-color);
        font-size: 0.7em;
        padding: 2px 8px;
        border-radius: 12px;
        white-space: nowrap;
        cursor: default;
        user-select: none;
    }
</style>