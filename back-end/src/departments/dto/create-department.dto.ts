import {IsString, IsArray, IsDate} from 'class-validator'
export class CreateDepartmentDto {
    
    @IsString()
    id : string;
    @IsString()
    name: string;

    @IsString()
    overview: string;

    @IsString()
    createAt: string;
}
