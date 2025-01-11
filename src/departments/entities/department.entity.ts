import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    overview: string;

    @OneToMany(() => Project, project => project.department)
    project: Project[];
}
