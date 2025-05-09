<script>
	let {totalAnswerCount = 0, correctAnswerCount = 0} = $props();
    let accuracy = $derived(correctAnswerCount / totalAnswerCount);
    let percentage = $derived(Math.round(accuracy*100));
    
    let color = $derived.by(() => {
        if (correctAnswerCount / totalAnswerCount >= 0.75) {
            return "var(--accent-green)";
        }
        else if (correctAnswerCount / totalAnswerCount >= 0.50) {
            return "var(--accent-yellow)";
        }
        else if (correctAnswerCount / totalAnswerCount >= 0.25) {
            return "var(--accent-orange)";
        }
        else {
            return "var(--accent-red)";
        }
    });
</script>

<div class="saber-panel-default accuracy-panel">
    <h4 class="accuracy-title center-text"><i class="fas fa-bolt"></i> Current Accuracy</h4>
    <div class="accuracy-bar-frame">
        <div class="accuracy-bar-background">
            <div class="accuracy-bar-content" style="--accuracy:{accuracy}; --color:{color}"></div>
        </div>
    </div>
    {#if percentage > 0}
        <p class="accuracy-percentage center-text">{correctAnswerCount}/{totalAnswerCount} - {percentage}%</p>
    {:else}
        <p class="accuracy-percentage center-text">{correctAnswerCount}/{totalAnswerCount} - 0%</p>
    {/if}
</div>

<style>
    .accuracy-panel {
      margin-bottom: 16px;
    }

    .accuracy-title {
        margin-top: 0px;
        margin-bottom: 10px;
    }

    .accuracy-percentage {
        margin: 8px 0px 0px 0px;
    }

    .accuracy-bar-frame {
        background-color: var(--layer-1);
        border-radius: 16px;
        padding: 2px;
    }

    .accuracy-bar-background {
        width: 100%;
        height: 20px;
        border-radius: 8px;
        background-color: var(--layer-0);
    }

    .accuracy-bar-content {
        width: calc(var(--accuracy) * 100%);
        height: 20px;
        border-radius: 8px;
        background-color: var(--color);
    }
</style>