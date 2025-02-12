import { Customer } from 'src/customers/entities/customer.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, ManyToOne} from 'typeorm';

@Entity()

export class Project {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column('text')
    name: string;

    @ManyToOne( () => Department,{cascade: true})
    department : Department;

    // @OneToMany ( () => ProjectEmployee, projectEmployee=> projectEmployee.project , {nullable:true, cascade: true})
    // projectEmployees: ProjectEmployee[];

    @OneToMany(()=>Employee, employees=> employees.project)
    employees: Employee[]

    @ManyToOne( () => Customer, {cascade: true})
    customer: Customer;

    @Column('text')
    requirements: string;
    
    @Column('simple-array')
    skills: string[];

    @Column({type: 'text',nullable: true})
    result: string;

    @Column({type: 'text', nullable: true})
    project_result_image: string;

    @Column({ type: 'text', default: () => `CAST(DATEDIFF(SECOND, '1970-01-01', GETUTCDATE()) AS NVARCHAR)` })
    project_start_date: string;
    
    @Column({ type: 'text', nullable: true })
    project_end_date: string;
    
    @Column({ type: 'text', default: () => `CAST(DATEDIFF(SECOND, '1970-01-01', GETUTCDATE()) AS NVARCHAR)` })
    createdAt: string;
    
    @Column({ type: 'text', default: () => `CAST(DATEDIFF(SECOND, '1970-01-01', GETUTCDATE()) AS NVARCHAR)` })
    lastUpdatedAt: string;
    
}
