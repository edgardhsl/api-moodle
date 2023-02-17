import { Category, CategoryResponse } from 'app/models/category';
import { Classwork } from 'app/models/classwork';
import { Course, CourseResponse } from 'app/models/course';
import { Student, StudentResponse } from 'app/models/student';
import { Authorize } from '.';
import { jsonToFormData } from '../http/form-data';

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

    public static async createCourse(courses: Course[]): Promise<CourseResponse[]> {
        try {
            return this.moodle.call({ wsfunction: 'core_course_create_courses', args: { courses: courses }, method: 'POST' });
        } catch (ex) {
            console.log(ex);
            throw { code: -1, message: 'Não foi possível criar o curso' };
        }
    }

    public static async getCategory(params?: Array<{ k: string, v: string }>) {
        try {
            const filters = params?.map(item => ({ key: item.k, value: item.v }));
            return this.moodle.call({ wsfunction: 'core_course_get_categories', args: filters ? { criteria: filters } : [] });
        } catch (ex) {
            throw { code: -1, message: 'Não foi possível retornar a categoria' };
        }
    }

    public static async createCategory(categories: Category[]): Promise<CategoryResponse> {
        try {
            return this.moodle.call({ wsfunction: 'core_course_create_categories', args: { categories: categories }, method: 'POST' });
        } catch (ex) {
            console.log(ex);
            throw { code: -1, message: 'Não foi possível criar a categoria' };
        }
    }

    public static async getUsers(params: Array<{ k: string, v: string }>) {
        try {
            const filters = params.map(item => ({ key: item.k, value: item.v }));
            return this.moodle.call({ wsfunction: 'core_user_get_users', args: filters });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar a lista de usuários.' };
        }
    }

    public static async createUser(user: Student): Promise<StudentResponse> {
        try {
            return this.moodle.call({ wsfunction: 'core_user_create_users', args: [user] });
        } catch (ex) {
            console.log(ex);
            throw { code: -1, message: 'Não foi possível retornar a lista de usuários.' };
        }
    }

    public static async enrolUser(user: Student): Promise<Student> {
        try {
            return this.moodle.call({ wsfunction: 'enrol_manual_enrol_users', args: [user.student] });
        } catch (ex) {
            console.log(ex);
            throw { code: -1, message: 'Não foi possível vincular um usuário ao curso.' };
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

    public static async createClassWork(classwork: Classwork): Promise<Classwork> {
        try {
            return this.moodle.call({ wsfunction: 'mod_forum_get_forums_by_courses', args: [classwork] });
        } catch (ex) {
            console.log(ex);
            throw { code: -1, message: 'Não foi possível retornar cadastrar a atividade.' };
        }
    }
}
