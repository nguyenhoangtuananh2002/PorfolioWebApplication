import { Injectable } from '@nestjs/common';
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
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>

  ){}
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const employees = await this.employeeRepository.find({where : {id : In (createProjectDto.employeesIds)}})
    const department = await this.departmentRepository.findOne({where : {id : createProjectDto.departmentId}})
    const customer = await this.customerRepository.findOne({where : {id: createProjectDto.customerId}})
    const project = this.projectRepository.create(createProjectDto)
    project.employees = employees
    project.department = department
    project.customer = customer
    return this.projectRepository.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findOneOrFail({where : {id}})
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail({where : {id}, relations:['department','customer','employees']})
    if (updateProjectDto.departmentId)
    {
      const department = await this.departmentRepository.findOne({where : {id:updateProjectDto.departmentId}})
      project.department = department
    }
    if (updateProjectDto.customerId)
      {
        const customer = await this.customerRepository.findOne({where : {id:updateProjectDto.customerId}})
        project.customer = customer
      }
      if (updateProjectDto.employeesIds)
        {
          const employess = await this.employeeRepository.find({where : {id: In(updateProjectDto.employeesIds)}})
          project.employees = employess
        }
      await this.projectRepository.save(project)
      return this.projectRepository.findOneOrFail({where : {id}});
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
