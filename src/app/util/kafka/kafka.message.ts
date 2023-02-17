export class KafkaMessage {

    static toJSON<T>(message: Buffer): T {
        const msg: Buffer = Buffer.from(message);
        return JSON.parse(msg.toString());

    }

}