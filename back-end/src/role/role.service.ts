import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository : Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    const new_role = this.roleRepository.create(createRoleDto)
    return this.roleRepository.save(new_role)
  }

  findAll() {
    return this.roleRepository.find({relations:['employees']});
  }

  findOne(id: string) {
    return this.roleRepository.findOne({where : {id}});
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id,updateRoleDto) ;
    return this.roleRepository.findOneOrFail({where : {id}})
  }

  async remove(id: string) {
    return await this.roleRepository.delete(id);
  }
}
