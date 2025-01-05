<script>
	let { name = "Category", color = "green", href = "/"} = $props();
</script>

<div class="panel-level-2" style="--color:{color}">
    <p>{name}</p>
    <a href={href}>Start</a>
</div>

<style>
    div {
        height: 100px;
        width: 100px;
        padding: 0px;
        margin: 8px;
        background-color: var(--color);
        display: inline-block;
    }

    p {
        margin: 0px;
        padding: 8px;
    }
</style>