import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()

export class Customer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('varchar',{length: 255, unique: true })
    email: string;

    @OneToMany(() => Project, project => project.customer)
    project: Project[];
}
