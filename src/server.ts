import { Server } from "@overnightjs/core";
import { CategoryConsumer } from "app/consumers/category.consumer";
import * as express from 'express';
import { EachMessagePayload } from "kafkajs";
import { ClassworkConsumer } from "./app/consumers/classwork.consumer";
import { CourseConsumer } from "./app/consumers/course.consumer";
import { StudentConsumer } from "./app/consumers/student.consumer";
import { CourseController } from "./app/controllers/courses.controller";
import { KafkaConsumer } from "./app/util/kafka/kafka.consumer";
import { KafkaMessage } from "./app/util/kafka/kafka.message";

export class MoodleAPIServer extends Server {

    controllers: any = {};

    constructor() {
        super();

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.controllers = {
            CourseController,
        }

        this.initializeKafka();

        super.addControllers(Object.keys(this.controllers).map((k) => new this.controllers[k]()));
    }

    public start(port: number) {
        this.app.listen(port, () => console.log('Server listening on port: ' + port))
    }

    public initializeKafka() {
        const kafkaConsumer = new KafkaConsumer();
        kafkaConsumer.addConsumer({ topics: ['moodle-category', 'moodle-course', 'moodle-student', 'moodle-classwork'] }, { eachMessage: (p) => this._syncMessage(p) });
    }

    private async _syncMessage(payload: EachMessagePayload) {
        try {
            if (!payload.message.value) return;

            switch (payload.topic) {
                case 'moodle-category': console.log(await CategoryConsumer.sync(KafkaMessage.toJSON(payload.message.value))); break;
                case 'moodle-course': console.log(await CourseConsumer.sync(KafkaMessage.toJSON(payload.message.value))); break;
                /* case 'moodle-student': StudentConsumer.sync(KafkaMessage.toJSON(payload.message.value)); break;
                case 'moodle-classwork': ClassworkConsumer.sync(KafkaMessage.toJSON(payload.message.value)); break; */
            }
        } catch (error) {
            console.error(error);
        }
    }
}