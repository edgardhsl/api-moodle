import { Authorize, Moodle } from "./app/util/moodle";
import { MoodleAPIServer } from "./server";

const server = new MoodleAPIServer();
Moodle.init(new Authorize(__dirname + '/app/config/credentials.json')).then(_ => {
    server.start(3000);
});