export const load = async ({ url }) => {
    const searchParams = url.searchParams;

    // const languageParam = searchParams.get("lang");
    const lessonParam = searchParams.get("lesson");

    const lessonConf = await import("$lib/data/fi/conf/textinput/lesson_config.json");
    const currentLessonConf = lessonConf.default[lessonParam];

    return {
        lessonConf: currentLessonConf
    }
}