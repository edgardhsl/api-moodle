export interface Category {
    id?: number;
    name?: string,
    parent?: number,
    idnumber?: number,
    description?: string,
    descriptionformat?: number,
    theme?: string,
}

export interface CategoryResponse {
    id: number,
    name: string
}