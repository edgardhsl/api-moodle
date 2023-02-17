import { Student } from 'app/models/student';
import { Moodle } from '../util/moodle';

export class StudentConsumer {

    static async sync(user: Student) {
        console.log(user);
        const response = await Moodle.createUser(user);
        console.trace(response)
        user.student.userid = response.id;
        this._enroll(user);

    }

    private static async _enroll(user: Student) {
        const response = await Moodle.enrolUser(user);
        console.trace(response)
    }

}