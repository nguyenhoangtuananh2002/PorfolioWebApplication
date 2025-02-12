import { IsEnum, IsString } from "class-validator";
import { Privilege } from "../entities/role.entity";

export class CreateRoleDto {

    @IsString()
    name : string

    @IsEnum(Privilege)
    privilege: Privilege
}
