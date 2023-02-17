export interface Student {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    idnumber: string,

    student: {
        roleid: number,   //Role to assign to the user
        userid: number   //The user that is going to be enrolled
        courseid: number   //The course to enrol the user role in
    }
}

export interface StudentResponse {
    id: number,
    username: string,
}