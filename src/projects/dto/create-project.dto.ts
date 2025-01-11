import { IsString, IsArray, IsOptional, IsDate } from 'class-validator'
export class CreateProjectDto {
        @IsString()
        project_name: string;

        @IsString()
        departmentId : number;
    
        @IsArray()
        employeesIds: number[];
 
        @IsString()
        customerId: number;

        @IsString()
        project_description: string;
        
        @IsArray()
        project_skills: string[];

        @IsString()
        project_requirments: string;
    
        @IsString()
        project_result: string;
    
        @IsString()
        @IsOptional()
        project_result_image: string;
    
        @IsDate()
        project_created: Date;
    
        @IsDate()
        @IsOptional()
        project_end_at: Date;
    
    
}
