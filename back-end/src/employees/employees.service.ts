import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import * as bcrypt from 'bcryptjs'
import { Department } from 'src/departments/entities/department.entity';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const new_employee = this.employeeRepository.create(createEmployeeDto)
    const role =  await this.roleRepository.findOne({where : {id : createEmployeeDto.roleId}})
    const salt = await bcrypt.genSalt(10)
    new_employee.role = role
    new_employee.password = await bcrypt.hash(new_employee.password, salt)
    return this.employeeRepository.save(new_employee)
  }

  findAll() {
    return this.employeeRepository.find({relations:['project','department','role']});
  }
  findOne(id: string) {
    return this.employeeRepository.findOneOrFail({where : {id},relations:['project','department','role']});
  }
  findOnebyEmail(email: string){
    return this.employeeRepository.findOne({where: {email}})
  }
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOneOrFail({where: {id},relations: ['project','department','role']})
    if (!employee)
    {
      console.log("Can't find Employee")
    }
    if(updateEmployeeDto.password && updateEmployeeDto.password !== employee.password)
    {
      const salt = await bcrypt.genSalt(10)
      updateEmployeeDto.password = await bcrypt.hash(updateEmployeeDto.password, salt)
    }
    else
    {
      delete updateEmployeeDto.password
    }
    if (updateEmployeeDto.projectId && employee.project && updateEmployeeDto.projectId !== employee.project.id) 
      {
      const newProject = await this.projectRepository.findOne({where: {id: updateEmployeeDto.projectId}})
      if (employee.project.id)
      {
        const oldProject = await this.projectRepository.findOne({where: {id: employee.project.id}})
        if(oldProject){
          oldProject.employees = await oldProject.employees.filter(emp => emp.id !== employee.id);
          await this.projectRepository.save(oldProject)
        }
      }
      if (updateEmployeeDto.roleId && updateEmployeeDto.roleId !== employee.role.id)
      {
        const newRole = await this.roleRepository.findOne({where : {id : updateEmployeeDto.roleId}})
        employee.role = newRole
      }
      newProject.employees.push(employee)
      await this.projectRepository.save(newProject)
      employee.project = newProject;

    }
    else if(!updateEmployeeDto.projectId)
    {
      if(employee.project)
      {
        const oldProject = await this.projectRepository.findOne({where: {id: employee.project.id},relations:['employees']})
        if(oldProject){
          oldProject.employees = oldProject.employees.filter(emp => emp.id !== employee.id)
          await this.projectRepository.save(oldProject)
        }
      }
      employee.project = null
    }
    if (updateEmployeeDto.departmentId && employee.department && updateEmployeeDto.departmentId !== employee.department.id) 
      {
      const newDepartment = await this.departmentRepository.findOne({where: {id: updateEmployeeDto.departmentId}})
      if (employee.department.id)
      {
        const oldDepartment = await this.departmentRepository.findOne({where: {id: employee.department.id}})
        if(oldDepartment){
          oldDepartment.employees = await oldDepartment.employees.filter(emp => emp.id !== employee.id);
          await this.departmentRepository.save(oldDepartment)
        }
      }
      
      newDepartment.employees.push(employee)
      await this.departmentRepository.save(newDepartment)
      employee.department = newDepartment;

    }
    else if(!updateEmployeeDto.departmentId)
    {
      if(employee.department)
      {
        const oldDepartment = await this.departmentRepository.findOne({where: {id: employee.department.id},relations:['employees']})
        if(oldDepartment){
          oldDepartment.employees = oldDepartment.employees.filter(emp => emp.id !== employee.id)
          await this.departmentRepository.save(oldDepartment)
        }
      }
      employee.department = null
    }
    Object.assign(employee,updateEmployeeDto)
    return this.employeeRepository.save(employee)

  }

  async remove(id: string) {
    return await this.employeeRepository.delete(id);
  }

  async pushEmployeeToProject(emp: Employee, proId:string){
    const project = await this.projectRepository.findOne({where: {id: proId},relations: ['employees']})
    if(project){
      project.employees.push(emp)
      return await this.projectRepository.save(project)
    }
  }
}
