import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Privilege {
    User = "user",
    Admin = "admin",
    superAdmin = "superAdmin",
}
@Entity()
export class Role {
    
    @PrimaryGeneratedColumn('uuid')
    id: string ;

    @Column('text')
    name : string;

    @Column({
        type: 'text',
    })
    privilege: Privilege

    @OneToMany(() => Employee,(employee) => employee.role)
    employees: Employee[]
}

