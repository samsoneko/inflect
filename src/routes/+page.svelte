<script>
    import CategoryBlock from "$lib/components/CategoryBlock.svelte";

    let current_tab = "declination";
</script>

<h1 class="homepage-title">Hyvää Päivää!☀️</h1>

<div class="page-section">
    <div class="saber-panel-default saber-border-warn disclaimer center-text">
        <h3><i class="fas fa-triangle-exclamation"></i> Disclaimer</h3>
        <p>This application is still in early development.</p>
        <p>Although basic functions do exist, no guarantee for the correctness of information can be given.</p>
    </div>
</div>

<div class="page-section">
    <h2><i class="fas fa-book"></i> Study</h2>
    <div class="tab-buttons">
        <button class={current_tab === "declination" ? "saber-tab-button-default-active" : "saber-tab-button-default"} onclick={() => current_tab = "declination"}>Declination</button>
        <button class={current_tab === "conjugation" ? "saber-tab-button-default-active" : "saber-tab-button-default"} onclick={() => current_tab = "conjugation"}>Conjugation</button>
        <button class={current_tab === "other" ? "saber-tab-button-default-active" : "saber-tab-button-default"} onclick={() => current_tab = "other"}>Other</button>
    </div>
    {#if current_tab == "declination"}
        <div class="category-div">
            <CategoryBlock name={"Nouns"} color={"var(--accent-blue)"} lesson_path="study/textinput?lang=fi&lesson=noun-declination" settings_path="study/textinput/settings?lang=fi&lesson=noun-declination" description={"Practise the declination of nouns"}/>
            <CategoryBlock name={"Possessives"} color={"var(--accent-indigo)"} lesson_path="study/textinput?lang=fi&lesson=noun-possessives" settings_path="study/textinput/settings?lang=fi&lesson=noun-possessives" description={"Practise the possessives of nouns"}/>
            <CategoryBlock name={"Pronouns"} color={"var(--accent-violet)"} lesson_path="study/textinput?lang=fi&lesson=pronoun-declination" settings_path="study/textinput/settings?lang=fi&lesson=pronoun-declination" description={"Practise the declination of pronouns"}/>
            <CategoryBlock name={"Adjectives"} color={"var(--accent-pink)"} lesson_path="study/textinput?lang=fi&lesson=adjective-declination" settings_path="study/textinput/settings?lang=fi&lesson=adjective-declination" description={"Practise the declination of adjectives"}/>
        </div>
    {:else if current_tab == "conjugation"}
        <div class="category-div">
            <CategoryBlock name={"Verbs"} color={"var(--accent-lime)"} lesson_path="study/textinput?lang=fi&lesson=verb-conjugation" settings_path="study/textinput/settings?lang=fi&lesson=verb-conjugation" description={"Practise the conjugation of verbs"}/>
            <CategoryBlock name={"Conditional"} color={"var(--accent-green)"} lesson_path="study/textinput?lang=fi&lesson=verb-conditional" settings_path="study/textinput/settings?lang=fi&lesson=verb-conditional" description={"Practise the conditional of verbs"}/>
            <CategoryBlock name={"Infinitives"} color={"var(--accent-teal)"} lesson_path="study/textinput?lang=fi&lesson=verb-infinitives" settings_path="study/textinput/settings?lang=fi&lesson=verb-infinitives" description={"Practise the infinitives of verbs"}/>
        </div>
    {:else if current_tab == "other"}
        <div class="category-div">
            <CategoryBlock name={"Time⌛"} color={"var(--accent-neutral)"} lesson_path="" settings_path="" description={"Practise temporal expressions"}/>
            <CategoryBlock name={"Counters⌛"} color={"var(--accent-neutral)"} lesson_path="" settings_path="" description={"Practise counting"}/>
            <CategoryBlock name={"Gradation⌛"} color={"var(--accent-neutral)"} lesson_path="" settings_path="" description={"Practise adjective gradation"}/>
        </div>
    {/if}
</div>

<style>
    .category-div {
        max-width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 10px;
    }

    .tab-buttons {
        max-width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 10px;
        row-gap: 10px;
        margin-bottom: 10px;
    }

    .homepage-title {
        margin-top: 32px;
        margin-bottom: 48px;
        font-size: 2.2em;
        text-align: center;
    }
</style>