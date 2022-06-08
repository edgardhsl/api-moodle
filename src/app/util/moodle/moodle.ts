import { Authorize } from '.';

export class Moodle {
    private static moodle: any;

    static async init(auth?: Authorize) {
        if (auth !== undefined) {
            this.moodle = await auth.auth();
        }
    }

    public static async getCourseList() {
        try {
            return this.moodle.call({ wsfunction: 'core_course_get_courses' });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar a lista de cursos.' };
        }
    }

    public static async getCourse(courseId: string) {
        try {
            return this.moodle.call({ wsfunction: 'core_course_get_courses', args: { options: { ids: [courseId] } } });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar o curso com o id indicado.' };
        }
    }

    public static async createCourse(courseId: string) {
        try {
            return this.moodle.call({ wsfunction: 'core_course_create_courses', args: { options: { ids: [courseId] } } });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível' };
        }
    }

    public static async getCourseStudents(courseId: string) {
        try {
            return this.moodle.call({ wsfunction: 'core_enrol_get_enrolled_users', args: { courseid: courseId } });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar a lista de estudantes.' };
        }
    }

    public static async getCourseForums(courseId: string) {
        try {
            return this.moodle.call({ wsfunction: 'mod_forum_get_forums_by_courses', args: { courseids: [courseId] } });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar a lista de fóruns.' };
        }
    }
}
