import { IsArray, IsBoolean, IsString } from 'class-validator'
export class CreateEmployeeDto {
    
    @IsString()
    email: string;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsArray()
    skills: string[];

    @IsString()
    role: string;

    @IsBoolean()
    is_admin: boolean;

    @IsArray()
    projectIds: number[];

}
