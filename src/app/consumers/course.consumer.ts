import { Course, CourseResponse } from 'app/models/course';
import { Category } from 'app/models/category';
import { Moodle } from '../util/moodle';
import { TextNormalizer } from 'app/util/text/text-normalizer';

export class CourseConsumer {

    private _categories: any[] = [];
    private _moodle: Moodle = new Moodle();

    async sync(params: any[]) {
        const responses: CourseResponse[][] = [];
        this._categories = await this._getCategories(params);

        for (const course of this._castToMoodle(params)) {
            responses.push(await this._moodle.course.create([course]));
        }

        return responses;
    }

    private async _getCategories(params: any[]): Promise<any[]> {
        const categories = await this._moodle.course.getCategory();
        console.log(categories);
        return categories || [];
    }

    private _castToMoodle(params: any[]) {
        return params.map((item: any) => {
            const category: Category | null = this._categories ? this._categories.find(item1 => +item1.idnumber == item.cursoId) : null;
            
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