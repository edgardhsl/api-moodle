import { ThrowError } from "app/util/throw-error";

export class UserAPI {

    private _moodle;

    constructor(moodle: any) {
        this._moodle = moodle;
    }

    public list(): Promise<any[]> {
        try {
            return this._moodle.call({ wsfunction: 'core_user_get_users_by_field' });
        } catch (ex) {
            throw new ThrowError({code: -1, message: 'Não foi possível retornar a lista de usuários.', detail: ex });
        }
    }

    public get(): Promise<any[]> {
        try {
            return this._moodle.call({ wsfunction: 'core_user_get_users_by_field' });
        } catch (ex) {
            throw new ThrowError({code: -1, message: 'Não foi possível retornar a lista de usuários.', detail: ex });
        }
    }

    public create(users: IUser[]): Promise<any[]> {
        try {
            return this._moodle.call({ wsfunction: 'core_user_create_users', args: { users: users } });
        } catch (ex) {
            throw new ThrowError({code: -1, message: 'Não foi possível retornar a lista de usuários.', detail: ex });
        }
    }

}