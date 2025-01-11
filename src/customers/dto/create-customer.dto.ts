import {IsString, IsArray} from 'class-validator'
export class CreateCustomerDto {
    
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsArray()
    projectIds: number[];

}
