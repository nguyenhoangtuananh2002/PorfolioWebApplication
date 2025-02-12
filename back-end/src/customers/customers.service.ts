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
    if (new_customer.gender === 'male')
    {
      new_customer.avatar = '/assets/data/Avatar.jpg'
    }
    else {
      new_customer.avatar = '/assets/data/women.jpg'
    }
    return this.customerRepository.save(new_customer)
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: string) {
    return this.customerRepository.findOneOrFail({where : {id}});
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.update(id, updateCustomerDto)
    return this.customerRepository.findOneOrFail({where : {id}});
  }

  async remove(id: string) {
    return this.customerRepository.delete(id)
  }
}
