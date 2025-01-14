import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee,Project])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
