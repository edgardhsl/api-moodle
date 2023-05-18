import { Moodle } from '../util/moodle';

export class StudentConsumer {

    private _moodle: Moodle = new Moodle();

    async sync(data: Array<any>) {
        const response = await this._moodle.user.create(this._castToMoodle(data));
    }

    private _castToMoodle(data: any[]): Array<IUser> {
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