<script>
	let { name = "Category", color = "green", lesson_path = "/", settings_path= "/", description = "Description"} = $props();
</script>

<div class="category-panel" style="--category-color:{color}">
    <p class="category-title">{name}</p>
    <p class="category-description">{description}</p>
    <div class="category-button-wrapper">
        <a class="category-button" href={lesson_path} aria-label="Study">Study<i class="fas fa-play"></i></a>
        <a class="category-button" href={settings_path} aria-label="Settings"><i class="fas fa-gear"></i></a>
    </div>
</div>

<style>
    .category-panel {
        padding: 10px;
        box-sizing: border-box;
        height: 116px;
        background-color: var(--category-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        display: inline-block;
        position: relative;
        transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    }

    .category-panel:hover {
        transform: scale(1.02);
    }

    .category-title {
        margin: 0px;
        padding: 0px;
        font-size: 1.4em;
        font-weight: bold;
        color: black;
    }

    .category-description {
        padding: 0px;
        margin: 4px 0px 0px 0px;
        font-size: 0.8em;
        color: black;
    }

    .category-button {
        padding: 6px;
        font-size: 1em;
        border-radius: 8px;
        color: white;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .category-button:hover {
        transform: scale(1.03);
    }

    .category-button-wrapper {
        position: absolute;
        bottom: 0;
        margin-bottom: 16px;
    }
</style>