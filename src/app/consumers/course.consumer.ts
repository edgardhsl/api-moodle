import { Course, CourseResponse } from 'app/models/course';
import { Category } from 'app/models/category';
import { Moodle } from '../util/moodle';

export class CourseConsumer {

    static categories: any[];

    static async sync(params: any[]) {
        const responses: CourseResponse[][] = [];
        this.categories = await this._getCategories(params);

        for (const course of this._castToMoodle(params)) {
            responses.push(await Moodle.createCourse([course]));
        }

        return responses;
    }

    private static async _getCategories(params: any[]): Promise<any[]> {
        return await Moodle.getCategory();
    }

    private static _castToMoodle(params: any[]) {
        return params.map((item: any) => {
            const category: Category | null = this.categories ? this.categories.find(item1 => +item1.idnumber == item.cursoId) : null;
            const course: Course = {
                idnumber: item.id,
                fullname: `${category?.name} - ${item.nome}`,
                categoryid: category?.id ?? null,
                shortname: `${this._normalize(category?.name).slice(0, 3)}${this._normalize(item.nome).slice(0, 3).toUpperCase()}`
            }

            return course;
        });
    }

    private static _normalize(str: string | undefined) {
        return str?.normalize('NFC').replace(/ /g,'').replace(/[^a-zA-Z0-9 ]/g, '') || '';
    }
}