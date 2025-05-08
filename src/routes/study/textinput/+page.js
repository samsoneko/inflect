export const load = async ({ url }) => {
    const searchParams = url.searchParams;

    // const languageParam = searchParams.get("lang");
    const lessonParam = searchParams.get("lesson");

    const lessonFiles = import.meta.glob("$lib/data/fi/res/finnish_common_3000/*.json");

    const lessonConf = await import("$lib/data/fi/conf/textinput/lesson_conf.json");
    const currentLessonConf = lessonConf.default[lessonParam];

    const lessonPath = "/src/lib/data/fi/res/finnish_common_3000/" + currentLessonConf.data_file;
    const translationPath = "/src/lib/data/fi/res/finnish_common_3000/translations.json";
    const loadLessonData = lessonFiles[lessonPath];
    const loadLessonTranslation = lessonFiles[translationPath];

    const lessonData = await loadLessonData();
    const lessonTranslation = await loadLessonTranslation();
    return {
        lessonData: lessonData.default,
        lessonConf: currentLessonConf,
        lessonTranslation: lessonTranslation
    }
}