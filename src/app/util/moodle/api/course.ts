import { ThrowError } from "../../throw-error";
import { Category, CategoryResponse } from 'app/models/category';
import { MoodleClient } from "../moodle";
import { Course } from "app/models/course";

export class CourseAPI {

    private _moodle: MoodleClient;

    constructor(moodle: MoodleClient) {
        this._moodle = moodle;
    }
    
    public list(): Promise<any[]> {
        try {
            return this._moodle.call({ wsfunction: 'core_course_get_courses' });
        } catch (ex) {
            throw new ThrowError({code: -1, message: 'Não foi possível retornar a lista de cursos.', detail: ex });
        }
    }

    public get(courseId: string) {
        try {
            return this._moodle.call({ wsfunction: 'core_course_get_courses', args: { options: { ids: [courseId] } } });
        } catch (ex) {
            throw new ThrowError({code: -2, message: 'Não foi possível retornar o curso com o id indicado.', detail: ex });
        }
    }

    public create(courses: Course[]): Promise<any> {
        try {
            return this._moodle.call({ wsfunction: 'core_course_create_courses', args: { courses: courses }, method: 'POST' });
        } catch (ex) {
            throw new ThrowError({code: -3, message: 'Não foi possível criar o curso', detail: ex });
        }
    }

    public getCategory(params?: Array<{ k: string, v: string }>) {
        try {
            const filters = params?.map(item => ({ key: item.k, value: item.v }));
            return this._moodle.call({ wsfunction: 'core_course_get_categories', args: filters ? { criteria: filters } : [] });
        } catch (ex) {
            throw new ThrowError({code: -4, message: 'Não foi possível retornar a categoria', detail: ex });
        }
    }

    public createCategory(categories: Category[]): Promise<CategoryResponse> {
        try {
            return this._moodle.call({ wsfunction: 'core_course_create_categories', args: { categories: categories }, method: 'POST' });
        } catch (ex) {
            throw new ThrowError({code: -4, message: 'Não foi possível criar a categoria', detail: ex });
        }
    }

    public getStudents(courseId: number) {
        try {
            return this._moodle.call({ wsfunction: 'core_enrol_get_enrolled_users', args: { courseid: courseId } });
        } catch (ex) {
            throw new ThrowError({code: -4, message: 'Não foi possível retornar a lista de estudantes.', detail: ex });
        }
    }
}