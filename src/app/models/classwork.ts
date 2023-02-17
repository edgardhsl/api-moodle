export class Classwork {
 
    id?: string;
    courseId?: string;
    title?: string;
    description?: string;
    attachments?: Array<any>;
    createdAt?: Date;
    updatedAt?: Date;
    dueAt?: Date;
    type?: Enumerator<any>;
    userId?: string; 

}