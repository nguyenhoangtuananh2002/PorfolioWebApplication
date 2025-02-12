import { IsArray, IsBoolean, IsOptional, isString, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';

export class CreateEmployeeDto {
    
    @IsString()
    avatar:string;
    
    @IsString()
    email: string;

    @IsString()
    gender: string;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsArray()
    skills: string[];

    @IsBoolean()
    is_admin: boolean;
    
    @IsString()
    password: string;

    @IsOptional()
    projectId?: string;

    @IsOptional()
    departmentId?: string;

    @IsOptional()
    roleId?: string;
    
    @IsString()
    @IsOptional()
    aboutMe:string;

}
