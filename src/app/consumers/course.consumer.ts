import { Course, CourseResponse } from 'app/models/course';
import { Category } from 'app/models/category';
import { Moodle } from '../util/moodle';
import { TextNormalizer } from 'app/util/text/text-normalizer';

export class CourseConsumer {

    static categories: any[];
    private static _moodle: Moodle = new Moodle();

    static async sync(params: any[]) {
        const responses: CourseResponse[][] = [];
        this.categories = await this._getCategories(params);

        for (const course of this._castToMoodle(params)) {
            responses.push(await this._moodle.course.create([course]));
        }

        return responses;
    }

    private static async _getCategories(params: any[]): Promise<any[]> {
        return await this._moodle.course.getCategory();
    }

    private static _castToMoodle(params: any[]) {
        return params.map((item: any) => {
            const category: Category | null = this.categories ? this.categories.find(item1 => +item1.idnumber == item.cursoId) : null;
            
            const course: Course = {
                idnumber: item.id,
                fullname: `${category?.name} - ${item.nome}`,
                categoryid: category?.id ?? null,
                shortname: `${TextNormalizer.shortName(category?.name).slice(0, 3)}${TextNormalizer.shortName(item.nome).slice(0, 3).toUpperCase()}`
            }

            return course;
        });
    }
}