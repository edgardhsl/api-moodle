import fs from 'fs';
import * as MoodleClient from 'moodle-client';

export class Authorize {
    
    private _moodleClient: any;
    private _credentialsPath: string;

    get client() {
        return this._moodleClient;
    }

    constructor(credentialsPath: string) {
        this._credentialsPath = credentialsPath;
    }

    async auth() {
        try {
            const credentials = fs.readFileSync(this._credentialsPath, { encoding: 'utf8', flag: 'r' }) as any;
            const { endpoint_url, token } = JSON.parse(credentials);

            return await MoodleClient.init({ wwwroot: endpoint_url, token: token });
        } catch (err) {
            console.error(`Unable to initialize the client:`, err);
        }
        /* .then((client: any) => {console.log(client); this._moodleClient = client})
        .catch((err: any) => console.log("Unable to initialize the client: " + err)); */
    }
}
