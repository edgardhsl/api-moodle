import { Classwork } from 'app/models/classwork';
import { Moodle } from '../util/moodle';

export class ClassworkConsumer {

    static async sync(user: Classwork) {
        const response = await Moodle.createClassWork(user);
        return response;
    }

}