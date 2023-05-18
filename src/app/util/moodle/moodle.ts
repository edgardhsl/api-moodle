
import { Authorize } from '.';
import { CourseAPI } from './api/course';
import { UserAPI } from './api/user';

export class Moodle {

    course!: CourseAPI;
    user!: UserAPI;

    private static _moodle: MoodleClient | undefined;

    constructor() {
        console.log(this.constructor.name, Moodle._moodle);
        if (Moodle._moodle) {
            this.course = new CourseAPI(Moodle._moodle);
            this.user = new UserAPI(Moodle._moodle);
        }
    }

    static async init(auth?: Authorize) {
        if (auth !== undefined) {
            Moodle._moodle = await auth.auth();
            console.log("Instância do cliente Moodle inicializado!");
        }
    }
}

export interface MoodleClientOptions {
    wwwroot: string;
    token: string;
}

export interface MoodleClientCallOptions {
    wsfunction: string;
    method?: 'GET' | 'POST';
    args?: any;
}

export interface MoodleClient {
    call(options: MoodleClientCallOptions): Promise<any>;
}