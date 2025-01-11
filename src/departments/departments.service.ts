import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository : Repository<Department>
  ){}
  create(createDepartmentDto: CreateDepartmentDto) {
    const new_department = this.departmentRepository.create(createDepartmentDto)
    return this.departmentRepository.save(new_department);
  }

  findAll() {
    return this.departmentRepository.find();
  }

  findOne(id: number) {
    return this.departmentRepository.findOneOrFail({where : {id}});
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    await this.departmentRepository.update(id,updateDepartmentDto)
    return this.departmentRepository.findOneOrFail({where : {id}});
  }

  remove(id: number) {
    return this.departmentRepository.delete(id);
  }
}
