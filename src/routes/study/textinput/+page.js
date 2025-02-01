export const load = async ({ url }) => {
    const searchParams = url.searchParams;

    // const languageParam = searchParams.get("lang");
    const lessonParam = searchParams.get("lesson");

    const lessonFiles = import.meta.glob("$lib/study/fi/*.json");

    const lessonConf = await import("$lib/textinput/lesson_conf.json");
    const currentLessonConf = lessonConf.default[lessonParam];

    const path = "/src/lib/study/fi/" + currentLessonConf.data_file;
    const loadLessonData = lessonFiles[path];

    const lessonData = await loadLessonData();
    return {
        lesson: lessonData.default,
        conf: currentLessonConf
    }
}