import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>
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

  remove(id: number) {
    return this.employeeRepository.delete(id);
  }
}
