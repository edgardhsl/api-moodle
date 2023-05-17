import { Classwork } from 'app/models/classwork';
import { Moodle } from '../util/moodle';

export class ClassworkConsumer {

    static async sync(user: Classwork) {
        //const response = await Moodle.createClassWork(user);
        //return response;
    }

    private static async _getCourses(params: any[]): Promise<any[]> {
        //return await Moodle.getCourseList();
        return new Promise((r) => r([]));
    }
}