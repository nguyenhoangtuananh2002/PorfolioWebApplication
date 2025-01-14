import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ){}
  create(createCustomerDto: CreateCustomerDto) {
    const new_customer = this.customerRepository.create(createCustomerDto)
    return this.customerRepository.save(new_customer)
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return this.customerRepository.findOneOrFail({where : {id}});
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.update(id, updateCustomerDto)
    return this.customerRepository.findOneOrFail({where : {id}});
  }

  async remove(id: number) {
    const projects = await this.projectRepository.find({where: {department:{id}}})
    for(const project of projects)
    {
      project.customer = null;
      await this.projectRepository.save(project)
    }
    return this.customerRepository.delete(id)
  }
}
