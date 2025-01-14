import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ){}
  create(createEmployeeDto: CreateEmployeeDto) {
    const new_employee = this.employeeRepository.create(createEmployeeDto)
    return this.employeeRepository.save(new_employee)
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: number) {
    return this.employeeRepository.findOneOrFail({where : {id}});
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepository.update(id,updateEmployeeDto)
    return this.employeeRepository.findOneOrFail({where: {id}});
  }

  async remove(id: number) {
    // Find the employee along with associated projects
    const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['project'] });
    
    // Iterate over each project the employee is part of
    for (const project of employee.project) {
      // Remove the employee from the project
      project.employees = project.employees.filter(emp => emp.id !== id);
      
      // Save the updated project
      await this.projectRepository.save(project);
    }

    // Now, remove the employee from the employee table
    await this.employeeRepository.delete(id);

    return { message: `Employee with ID ${id} successfully removed` };
  }
}
