import { Type } from 'class-transformer';
import { IsString, IsArray, IsOptional, IsDate, ValidateNested } from 'class-validator'
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { CreateDepartmentDto } from 'src/departments/dto/create-department.dto';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { Employee } from 'src/employees/entities/employee.entity';
export class CreateProjectDto {
        @IsString()
        name: string;

        @Type(()=>CreateDepartmentDto)
        department : CreateDepartmentDto;

        @Type(()=>CreateCustomerDto)
        customer: CreateCustomerDto;
        
        @IsString()
        description: string; 
        
        @IsArray()
        skills: string[];

        @IsString()
        requirements: string;
    
        @IsString()
        result: string;
    
        @IsString()
        @IsOptional()
        project_result_image: string;
    
        @IsString()
        project_start_date: string;
    
        @IsString()
        @IsOptional()
        project_end_date: string;

        @IsString()
        createdAt: string

        @IsString()
        lastUpdatedAt: string;
        
    
}
