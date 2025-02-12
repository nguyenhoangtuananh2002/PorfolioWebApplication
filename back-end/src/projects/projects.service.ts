import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

  ){}
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { department, customer, ...projectData } = createProjectDto;

    const departmentEntity = await this.departmentRepository.findOne({where : {id : createProjectDto.department.id}})
    const customerEntity = await this.customerRepository.findOne({where :{id : createProjectDto.customer.id}})

    if (!departmentEntity || !customerEntity)
    {
      throw new Error('Invalid department or customer')
    }

    const newProject = this.projectRepository.create({
      ...projectData,
      department: departmentEntity,
      customer: customerEntity,
    })

    await this.projectRepository.save(newProject);
    return newProject
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({relations:['customer','department','employees']});
  }

  findOne(id: string): Promise<Project> {
    return this.projectRepository.findOneOrFail({where : {id},relations: ['customer','department','employees']},)
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({where: {id},relations:['customer','department']})
    Object.assign(project,{
      name: updateProjectDto.name,
      requirements: updateProjectDto.requirements,
      skills: updateProjectDto.skills,
      project_start_date: updateProjectDto.project_start_date,
      project_end_date: updateProjectDto.project_end_date,
    })
    await this.projectRepository.save(project)
    return project    
  }

  remove(id: string) {
    return this.projectRepository.delete(id);
  }
}
