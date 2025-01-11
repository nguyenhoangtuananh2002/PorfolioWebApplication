import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Employee,Department,Customer])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
