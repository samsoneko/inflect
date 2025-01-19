<script>
    import CategoryBlock from "$lib/CategoryBlock.svelte";
</script>

<h1 class="page-title">Hyvää Päivää!</h1>

<div class="page-section">
    <h2><i class="fas fa-book"></i> Study</h2>
    <div class="category-div">
        <CategoryBlock name={"Declination"} color={"var(--blue-color)"} lesson_path="study/textinput?lang=fi&lesson=decl" settings_path="study/textinput/settings?lang=fi&lesson=decl" description={"Practise the declination of nouns and adjectives"}/>
        <CategoryBlock name={"Conjugation"} color={"var(--red-color)"} lesson_path="study/textinput?lang=fi&lesson=conj" settings_path="study/textinput/settings?lang=fi&lesson=conj" description={"Practise the conjugation of verbs"}/>
        <CategoryBlock name={"Rections"} color={"var(--green-color)"} lesson_path="study/fi/rections" description={"Practise the rections for a variety of different verbs"}/>
        <CategoryBlock name={"Time"} color={"var(--purple-color)"} lesson_path="study/fi/time" description={"Practise different ways of expressing time"}/>
    </div>
</div>

<style>
    .category-div {
        max-width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 10px;
    }
</style>