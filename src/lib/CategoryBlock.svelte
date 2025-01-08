<script>
	let { name = "Category", color = "green", href = "/"} = $props();
</script>

<div class="category" style="--category-color:{color}">
    <p>{name}</p>
    <a href={href}>Start</a>
</div>

<style>
    .category {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        margin-bottom: 10px;
        background-color: var(--category-color);
        text-align: center;
        border-radius: var(--border-radius);
        box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.6);
    }

    p, a {
        margin: 0px;
        padding: 8px;
    }
</style>