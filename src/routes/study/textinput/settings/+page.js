export const load = async ({ url }) => {
    const searchParams = url.searchParams;

    // const languageParam = searchParams.get("lang");
    const lessonParam = searchParams.get("lesson");

    const lessonFiles = import.meta.glob("$lib/data/fi/res/finnish_common_3000/*.json");

    const lessonConf = await import("$lib/data/fi/conf/textinput/lesson_conf.json");
    const currentLessonConf = lessonConf.default[lessonParam];

    const lessonPath = "/src/lib/data/fi/res/finnish_common_3000/" + currentLessonConf.data_file;
    const labelPath = "/src/lib/data/fi/res/finnish_common_3000/labels.json";
    const loadLessonData = lessonFiles[lessonPath];
    const loadLessonLabels = lessonFiles[labelPath];

    const lessonData = await loadLessonData();
    const lessonLabels = await loadLessonLabels();
    return {
        lessonData: lessonData.default,
        lessonConf: currentLessonConf,
        lessonLabels: lessonLabels.default
    }
}