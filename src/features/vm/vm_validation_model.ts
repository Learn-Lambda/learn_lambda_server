import { IsString } from "class-validator";




export class VmValidationModel {
    constructor() { } 
    @IsString()
    code: string;
    @IsString()
    token: string;
    @IsString()
    taskId: string;
}