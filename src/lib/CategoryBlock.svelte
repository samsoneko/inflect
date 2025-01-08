<script>
	let { name = "Category", color = "green", href = "/"} = $props();
</script>

<div class="category" style="--color:{color}">
    <p>{name}</p>
    <a href={href}>Start</a>
</div>

<style>
    .category {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        margin-bottom: 10px;
        background-color: var(--color);
        text-align: center;
        border-radius: 10px;
        box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.6);
    }

    p, a {
        margin: 0px;
        padding: 8px;
        text-shadow: 2px 2px 2px black;
    }
</style>