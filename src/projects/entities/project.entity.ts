import { Customer } from 'src/customers/entities/customer.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, ManyToOne} from 'typeorm';

@Entity()

export class Project {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('text')
    project_name: string;

    @ManyToOne( () => Department, department => department.project)
    @JoinColumn()
    department : Department;

    @ManyToMany ( () => Employee, employees=> employees.project , {nullable:true})
    @JoinTable()
    employees: Employee[];

    @ManyToOne( () => Customer, customer =>customer.project)
    @JoinColumn()
    customer: Customer;

    @Column('text')
    project_description: string;
    
    @Column('simple-array')
    project_skills: string[];

    @Column('text')
    project_requirments: string;

    @Column('text')
    project_result: string;

    @Column({type: 'text', nullable: true})
    project_result_image: string;

    @Column({type:'datetime',default: () => 'CURRENT_TIMESTAMP'})
    project_created: Date;

    @Column({type:'date' , nullable: true})
    project_end_at: Date;
}
