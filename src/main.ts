import { Authorize, Moodle } from "./app/util/moodle";
import { MoodleAPIServer } from "./server";

Moodle.init(new Authorize(__dirname + '/app/config/credentials.json')).then(moodle => {
    console.log(moodle);
    const server = new MoodleAPIServer();
    server.start(4000);
});