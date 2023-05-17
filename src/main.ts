import { Authorize, Moodle } from "./app/util/moodle";
import { MoodleAPIServer } from "./server";

Moodle.init(new Authorize(__dirname + '/app/config/credentials.json')).then(_ => {
    const server = new MoodleAPIServer();
    server.start(4000);
});