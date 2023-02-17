import { Category, CategoryResponse } from "app/models/category";
import { Moodle } from "app/util/moodle";

export class CategoryConsumer {

    static async sync(params: any) {
        const responses: CategoryResponse[] = [];

        for(const category of this._castToMoodle(params)) {
            responses.push(await Moodle.createCategory([category]));
        }

        return responses;
    }

    private static _castToMoodle(params: any[]): Category[] {
        return params.map((item: any) => {
            const category: Category = {
                idnumber: item.id,
                name: item.nome,
            }

            return category;
        });
    }

}