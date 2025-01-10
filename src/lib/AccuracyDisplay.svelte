<script>
	let {accuracy = 0.5, color = "green"} = $props();
</script>

<div class="layer-1-element accuracy-panel">
    <h4 class="accuracy-title center-text"><i class="fas fa-bolt"></i> Current Accuracy</h4>
    <div class="accuracy-bar-frame">
        <div class="accuracy-bar-content" style="--accuracy:{accuracy}; --color:{color}"></div>
    </div>
</div>

<style>
    .accuracy-panel {
      border-radius: var(--border-radius);
      margin-bottom: 16px;
    }

    .accuracy-title {
        margin-top: 0px;
        margin-bottom: 10px;
    }

    .accuracy-bar-frame {
        background-color: var(--layer-2);
        border-radius: 16px;
        padding: 2px;
    }

    .accuracy-bar-content {
        width: calc(var(--accuracy) * 100%);
        height: 10px;
        border-radius: 12px;
        background-color: var(--color);
    }
</style>