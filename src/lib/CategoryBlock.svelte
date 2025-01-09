<script>
	let { name = "Category", color = "green", href = "/"} = $props();
</script>

<div class="category" style="--category-color:{color}">
    <p>{name}</p>
    <a class="layer-1-element" href={href}>Start</a>
</div>

<style>
    .category {
        width: 46%;
        padding: 2px 6px 16px 6px;
        box-sizing: border-box;
        margin: 6px 4px;
        background-color: var(--category-color);
        text-align: center;
        border-radius: var(--border-radius);
        box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.6);
        display: inline-block;
    }

    p {
        margin: 4px;
        padding: 8px;
        font-size: 1.4em;
        color: white;
    }

    a {
        padding: 6px;
        font-size: 1.2em;
        border-radius: 12px;
        color: white;
    }
</style>