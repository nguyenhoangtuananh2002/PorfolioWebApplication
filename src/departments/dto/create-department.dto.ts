import {IsString, IsArray} from 'class-validator'
export class CreateDepartmentDto {
    
    @IsString()
    name: string;

    @IsString()
    overview: string;

    @IsArray()
    projectIds: number[];
}
