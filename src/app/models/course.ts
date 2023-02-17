export interface Course {
    fullname: string,
    shortname: string,
    categoryid: number | null,
    idnumber: string
}

export interface CourseResponse {
    id: number,
    shortname: string
}