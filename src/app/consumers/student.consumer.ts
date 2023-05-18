import { Moodle } from '../util/moodle';

export class StudentConsumer {

    private static _moodle: Moodle = new Moodle();

    static async sync(data: Array<any>) {
        const response = await StudentConsumer._moodle.user.create(this._castToMoodle(data));
    }

    private static _castToMoodle(data: any[]): Array<IUser> {
        return data.map((user) => ({
            idnumber: user.id,
            username: user.login,
            firstname: user.nome,
            lastname: user.sobrenome,
            email: user.email,
            preferences: [
                {
                    type: 'auth_forcepasswordchange',
                    value: true
                }
            ]
        }));
    }

}