export class ThrowError {

    readonly code: number;
    readonly message: string;
    readonly detail: any;

    constructor(data: { code?: number, message: string, detail: any }) { 
        this.code = data.code ?? -1;
        this.message = data.message;
        this.detail = data.detail;
    }

}