import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar',{length: 255})
    firstname: string

    @Column('varchar',{length: 255})
    lastname: string

    @Column('varchar',{length: 255, unique: true, nullable: false })
    email: string

    @Column('simple-array')
    skills: string[]

    @Column('text')
    role: string;

    @Column({ type: 'bit', default: false })
    is_admin: boolean;    

    @ManyToMany(() => Project, project=> project.employees)
    project: Project[]


}
