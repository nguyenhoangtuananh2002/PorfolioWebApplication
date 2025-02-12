import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Project])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
